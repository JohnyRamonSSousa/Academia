
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { userService } from '../services/firestore';
import { User } from '../types';
import { doc, onSnapshot, enableNetwork, Timestamp } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    isStudent: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    isStudent: false,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to force enable network on mount
        try {
            enableNetwork(db).catch(e => console.log("Network enable warning:", e));
        } catch (e) {
            // ignore
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                // Listen to user changes in real-time to handle race conditions during registration
                // This ensures that as soon as the profile is created in Firestore, the app updates
                const userRef = doc(db, 'users', firebaseUser.uid);
                const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data() as User;

                        // Check for expired status
                        if (userData.status === 'ativo' && userData.data_vencimento) {
                            try {
                                const vencimento = userData.data_vencimento.toDate();
                                const now = new Date();
                                if (vencimento < now) {
                                    // Optimistic update
                                    userData.status = 'vencido';
                                    userService.updateUserStatus(userData.id, 'vencido', userData.data_vencimento).catch(console.warn);
                                }
                            } catch (dateErr) {
                                console.warn("Date check error:", dateErr);
                            }
                        }

                        // Ensure role exists to prevent redirect loops in ProtectedRoute
                        if (!userData.role) {
                            userData.role = 'student';
                        }

                    } else {
                        // Profile doesn't exist (legacy user or race condition)
                        // Create a fallback user object to allow access
                        console.warn("User profile missing in Firestore, using fallback.");
                        const fallbackUser: User = {
                            id: firebaseUser.uid,
                            name: firebaseUser.displayName || 'Usuário',
                            email: firebaseUser.email || '',
                            phone: '',
                            role: 'student', // Default valid role
                            plano: '',
                            status: 'ativo',
                            data_vencimento: null,
                            data_cadastro: Timestamp.now()
                        };
                        setUser(fallbackUser);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });

                // Cleanup nested listener when auth changes (or when component unmounts via main cleanup)
                // Note: onAuthStateChanged doesn't provide a direct way to clean up previous side effects of the callback itself easily 
                // without external freq refs, but since this is a top-level provider, it mostly runs once per auth state change.
                // However, stricly speaking we should track the unsubscribeUser.

            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };

    const isAdmin = user?.role === 'admin';
    const isStudent = user?.role === 'student';

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, isStudent, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

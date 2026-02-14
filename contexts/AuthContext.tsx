
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../firebase';
import { userService } from '../services/firestore';
import { User } from '../types';

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
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                try {
                    const userDoc = await userService.getUser(firebaseUser.uid);
                    if (userDoc) {
                        // Check status logic here as well? 
                        // For now just set the user. 
                        // Ideally we check status on every login, but let's trust the stored data for now
                        // except for real-time updates which would require onSnapshot.
                        // For this MVP, fetching once on load is okay.

                        // Check if status needs update based on expired date?
                        // Doing this check here ensures user status is up to date on login/refresh
                        if (userDoc.status === 'ativo' && userDoc.data_vencimento) {
                            const vencimento = userDoc.data_vencimento.toDate();
                            const now = new Date();
                            if (vencimento < now) {
                                await userService.updateUserStatus(userDoc.id, 'vencido', userDoc.data_vencimento);
                                userDoc.status = 'vencido';
                            }
                        }

                        setUser(userDoc);
                    } else {
                        // User exists in Auth but not in Firestore (shouldn't happen in normal flow)
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
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

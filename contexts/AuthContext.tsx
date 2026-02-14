
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { userService } from '../services/firestore';
import { User } from '../types';
import { enableNetwork } from 'firebase/firestore';

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
                try {
                    // Slight delay to allow Firestore to initialize/restore cache
                    // This often fixes "client is offline" race conditions on reload
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const userDoc = await userService.getUser(firebaseUser.uid);
                    if (userDoc) {
                        // Check if status needs update based on expired date?
                        if (userDoc.status === 'ativo' && userDoc.data_vencimento) {
                            try {
                                const vencimento = userDoc.data_vencimento.toDate();
                                const now = new Date();
                                if (vencimento < now) {
                                    // Try to update, but don't block login if this fails (e.g. offline)
                                    userService.updateUserStatus(userDoc.id, 'vencido', userDoc.data_vencimento).catch(console.warn);
                                    userDoc.status = 'vencido';
                                }
                            } catch (dateErr) {
                                console.warn("Date check error:", dateErr);
                            }
                        }
                        setUser(userDoc);
                    } else {
                        // User exists in Auth but not locally/remotely yet?
                        // Keep the auth user but with restricted access until profile loads?
                        // For now, set null to force login/register flow or show error
                        console.warn("User authenticated but profile not found in Firestore.");
                        setUser(null);
                    }
                } catch (error: any) {
                    console.error("Error fetching user data:", error);

                    // If offline, maybe we can't get the user profile yet.
                    // But we shouldn't necessarily log them out if it's just a network blip.
                    // For this simple app, we set user to null to play safe, or we could handle a "retry" state.
                    if (error.code === 'unavailable' || error.message.includes('offline')) {
                        console.log("Offline mode detected. Waiting for connection...");
                    }
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


import { db } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    addDoc,
    Timestamp
} from 'firebase/firestore';
import { User, Plan, Payment } from '../types';

// Collections
const USERS_COLLECTION = 'usuarios';
const PLANS_COLLECTION = 'planos';
const PAYMENTS_COLLECTION = 'pagamentos';

export const userService = {
    async createUser(user: User) {
        const userRef = doc(db, USERS_COLLECTION, user.id);
        await setDoc(userRef, user);
    },

    async getUser(uid: string): Promise<User | null> {
        const userRef = doc(db, USERS_COLLECTION, uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            return snap.data() as User;
        }
        return null;
    },

    async getAllUsers(): Promise<User[]> {
        const q = query(collection(db, USERS_COLLECTION));
        const snap = await getDocs(q);
        return snap.docs.map(doc => doc.data() as User);
    },

    async updateUserStatus(uid: string, status: 'ativo' | 'vencido', data_vencimento: any) {
        const userRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(userRef, { status, data_vencimento });
    },

    async updateUser(uid: string, data: Partial<User>) {
        const userRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(userRef, data);
    }
};

export const planService = {
    async createPlan(plan: Omit<Plan, 'id'>) {
        const docRef = await addDoc(collection(db, PLANS_COLLECTION), plan);
        await updateDoc(docRef, { id: docRef.id });
        return docRef.id;
    },

    async getPlans(): Promise<Plan[]> {
        const snap = await getDocs(collection(db, PLANS_COLLECTION));
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plan));
    },

    async updatePlan(id: string, plan: Partial<Plan>) {
        const planRef = doc(db, PLANS_COLLECTION, id);
        await updateDoc(planRef, plan);
    },

    async deletePlan(id: string) {
        const planRef = doc(db, PLANS_COLLECTION, id);
        await deleteDoc(planRef);
    },

    async getPlan(id: string): Promise<Plan | null> {
        const planRef = doc(db, PLANS_COLLECTION, id);
        const snap = await getDoc(planRef);
        if (snap.exists()) {
            return { id: snap.id, ...snap.data() } as Plan;
        }
        return null;
    }
};

export const paymentService = {
    async createPayment(payment: Omit<Payment, 'id'>) {
        const docRef = await addDoc(collection(db, PAYMENTS_COLLECTION), payment);
        await updateDoc(docRef, { id: docRef.id });
        return docRef.id;
    },

    async getPayments(): Promise<Payment[]> {
        const q = query(collection(db, PAYMENTS_COLLECTION), orderBy('data_pagamento', 'desc'));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment));
    },

    async getStudentPayments(userId: string): Promise<Payment[]> {
        const q = query(
            collection(db, PAYMENTS_COLLECTION),
            where('user_id', '==', userId),
            orderBy('data_pagamento', 'desc')
        );
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment));
    }
};

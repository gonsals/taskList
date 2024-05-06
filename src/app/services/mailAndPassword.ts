import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, db, doc, sendEmailVerification, setDoc } from "./firebase";

export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        const user = userCredential.user;
        const docRef = doc(db, 'usersTask', user.uid);
        const userEmail = user.email || '';
        const userName = userEmail.split('@')[0];
        await setDoc(docRef, { uid: user.uid, email: user.email, userName: userName });
        return user.uid;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            return 'An unknown error occurred';
        }
    }
}



export const signIn = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log('rrrrrrrrrrrr', result)
        return result.user;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            return 'An unknown error occurred';
        }
    }
}

export const getCurrentUserId = async () => auth.currentUser?.uid;
export const logout = async () => await signOut(auth);

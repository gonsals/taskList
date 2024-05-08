import {
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    db,
    doc,
    sendEmailVerification,
    setDoc,
} from "./firebase";

export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await sendEmailVerification(userCredential.user);
        const user = userCredential.user;
        const docRef = doc(db, "usersTask", user.uid);
        await setDoc(docRef, {
            uid: user.uid,
            email: user.email,
        });
        return user.uid;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            return "An unknown error occurred";
        }
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user.uid;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
};

export const getCurrentUserId = async () => auth.currentUser?.uid;
export const logout = async () => await signOut(auth);

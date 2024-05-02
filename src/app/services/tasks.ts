import { addDoc, collection, db, getDocs, query, where } from "./firebase";


const collectionName = "userTasks";


export const access = async (name: string) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('name', '==', name)));
    if (result.size === 0) {
        const a = await addDoc(colRef, { name });
        return a.id;
    }
    return result.docs[0].id;
}
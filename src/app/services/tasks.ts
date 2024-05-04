import { TaskType } from "../../common/TaskType";
import {
    addDoc,
    collection,
    db,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "./firebase";

const collectionName = "userTasks";

// Accede a una tarea por su nombre
export const access = async (name: string): Promise<string> => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where("name", "==", name)));

    if (result.empty) {
        const docRef = await addDoc(colRef, { name });
        return docRef.id;
    } else {
        return result.docs[0].id;
    }
};

// Crea una nueva tarea para un usuario específico
export const createTask = async (
    task: TaskType,
    userId: string
): Promise<string> => {
    try {
        if (!task.textTask) {
            throw new Error("La tarea no tiene texto");
        }
        const colRef = collection(db, collectionName, userId, "tasks");

        const tasks = await getTasksById(userId);

        if (
            tasks &&
            tasks.some(
                (existingTask) => existingTask.textTask === task.textTask
            )
        ) {
            throw new Error("La tarea ya existe");
        }

        const docRef = await addDoc(colRef, task);
        return docRef.id;
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
};

// Obtiene todas las tareas de un usuario por su ID
export const getTasksById = async (
    userId: string
): Promise<TaskType[] | null> => {
    try {
        const colRef = collection(db, collectionName, userId, "tasks");
        const querySnapshot = await getDocs(colRef);

        const tasks: TaskType[] = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ ...(doc.data() as TaskType), id: doc.id });
        });

        return tasks;
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
    }
};

// DELETE
export const deleteTask = async (userId: string, id: string) => {
    try {
        const docRef = doc(db, collectionName, userId, "tasks", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error al eliminar la task:", error);
        throw error;
    }
};

// UPDATE
export const updateTask = async (
    userId: string,
    id: string,
    updatedData: TaskType
): Promise<TaskType | null> => {
    try {
        const docRef = doc(db, collectionName, userId, "tasks", id);
        await updateDoc(docRef, { ...updatedData });
        const updatedDocSnapshot = await getDoc(docRef);
        if (updatedDocSnapshot.exists()) {
            return {
                ...updatedDocSnapshot.data(),
                id: updatedDocSnapshot.id,
            } as TaskType;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al actualizar la task: ", error);
        throw error;
    }
};

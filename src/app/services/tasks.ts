import { TaskType } from "../../common/TaskType";
import { UserType } from "../../common/UserType";
import {
    addDoc,
    collection,
    db,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "./firebase";

const collectionName = "userTasks";

export const getUserById = async (uid: string): Promise<UserType | null> => {
    try {
        const docRef = doc(db, "usersTask", uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return { ...docSnapshot.data(), id: docSnapshot.id } as UserType;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el user:", error);
        throw error;
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

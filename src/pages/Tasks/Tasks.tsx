//import { Test } from './Tasks.styles';
import { UserContext } from "../../app/providers/UserProvider";
import { useContext, useEffect, useState } from "react";
import { TaskType } from "../../common/TaskType";
import {
    createTask,
    deleteTask,
    getTasksById,
    updateTask,
} from "../../app/services/tasks";
import { Container, Modal, Test } from "./Tasks.styles";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Tasks = () => {
    const { user } = useContext(UserContext);

    const [task, setTask] = useState<TaskType>({ textTask: "" });
    const [tasks, setTasks] = useState<TaskType[] | null>(null);
    // const [modal, setModal] = useState(false);
    //TODO https://www.npmjs.com/package/react-pure-modal
    const [updatedTask, setUpdatedTask] = useState<TaskType>(task);

    useEffect(() => {
        if (user && user.id) {
            getTasksById(user.id).then((data) => setTasks(data));
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (user && user.id && task.textTask.trim() !== "") {
                await createTask(task, user.id);
                const refreshTasks = await getTasksById(user.id);
                setTasks(refreshTasks);
                setTask({ textTask: "" });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (taskId: string | undefined) => {
        try {
            if (taskId && user.id) {
                await deleteTask(user.id, taskId);
                if (user && user.id) {
                    const refreshTasks = await getTasksById(user.id);
                    setTasks(refreshTasks);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (taskId: string | undefined) => {
        try {
            if (taskId && user.id && updatedTask) {
                await updateTask(user.id, taskId, updatedTask);
                setIsOpen(false);
                if (user && user.id) {
                    const refreshTasks = await getTasksById(user.id);
                    setTasks(refreshTasks);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            {user.userName ? (
                <h2>{user.userName}'s Tasks</h2>
            ) : (
                <h2>User not found</h2>
            )}

            {tasks &&
                tasks.map((task) => (
                    <Test key={task.id}>
                        <p>{task.textTask}</p>
                        <button onClick={() => handleDelete(task.id)}>
                            Borrar
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            Update
                        </button>
                        {isOpen && (
                            <Modal>
                                <textarea
                                    value={
                                        updatedTask?.textTask || task.textTask
                                    }
                                    onChange={(e) =>
                                        setUpdatedTask({
                                            ...updatedTask,
                                            textTask: e.target.value,
                                        })
                                    }
                                />
                                <button onClick={() => handleUpdate(task.id)}>
                                    Update
                                </button>
                                <button onClick={() => setIsOpen(!isOpen)}>
                                    Close
                                </button>
                            </Modal>
                        )}
                    </Test>
                ))}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={task.textTask}
                    onChange={(e) =>
                        setTask({ ...task, textTask: e.target.value })
                    }
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </Container>
    );
};

export default Tasks;

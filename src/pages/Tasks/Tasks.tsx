import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { Container, Test, TaskContainer } from "./Tasks.styles";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { TaskType } from "../../common/TaskType";
import {
    createTask,
    deleteTask,
    getTasksById,
    updateTask,
} from "../../app/services/tasks";

const Tasks = () => {
    const { user } = useContext(UserContext);

    const [task, setTask] = useState<TaskType>({ textTask: "" });
    const [tasks, setTasks] = useState<TaskType[] | null>(null);
    const [modal, setModal] = useState<boolean>(false);
    const [updatedTask, setUpdatedTask] = useState<TaskType>({ textTask: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user && user.id) {
                    const data = await getTasksById(user.id);
                    setTasks(data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (user && user.id && task.textTask.trim() !== "") {
                await createTask(task, user.id);
                const refreshedTasks = await getTasksById(user.id);
                setTasks(refreshedTasks);
                setTask({ textTask: "" });
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleDelete = async (taskId: string | undefined) => {
        try {
            if (taskId && user && user.id) {
                await deleteTask(user.id, taskId);
                const refreshedTasks = await getTasksById(user.id);
                setTasks(refreshedTasks);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdate = async (taskId: string | undefined) => {
        try {
            if (
                taskId &&
                user &&
                user.id &&
                updatedTask.textTask.trim() !== ""
            ) {
                await updateTask(user.id, taskId, updatedTask);
                setModal(false);
                const refreshedTasks = await getTasksById(user.id);
                setTasks(refreshedTasks);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <Container>
            {user.userName ? (
                <>
                    <h2>{user.userName}'s Tasks</h2>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={task.textTask}
                            onChange={(e) =>
                                setTask({ ...task, textTask: e.target.value })
                            }
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>

                    <TaskContainer>
                        {tasks &&
                            tasks.map((task) => (
                                <Test key={task.id}>
                                    <p>{task.textTask}</p>
                                    <div className="actionButtons">
                                        <button
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="button"
                                            onClick={() => {
                                                setModal(true);
                                                setUpdatedTask(task);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </div>

                                    <PureModal
                                        header={`${user.userName}'s Tasks`}
                                        footer={
                                            <div className="actionButtons">
                                                <button
                                                    onClick={() =>
                                                        setModal(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleUpdate(
                                                            updatedTask.id
                                                        )
                                                    }
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        }
                                        isOpen={modal}
                                        closeButton="X"
                                        closeButtonPosition="header"
                                        onClose={() => {
                                            setModal(false);
                                            return true;
                                        }}
                                    >
                                        <textarea
                                            value={updatedTask?.textTask}
                                            onChange={(e) =>
                                                setUpdatedTask({
                                                    ...updatedTask,
                                                    textTask: e.target.value,
                                                })
                                            }
                                        />
                                    </PureModal>
                                </Test>
                            ))}
                    </TaskContainer>
                </>
            ) : (
                <h2>User not found</h2>
            )}
        </Container>
    );
};

export default Tasks;

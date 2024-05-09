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
import { logout } from "../../app/services/mailAndPassword";

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

    const handleDelete = async (taskId: string) => {
        try {
            if (user && user.id) {
                await deleteTask(user.id, taskId);
                const refreshedTasks = await getTasksById(user.id);
                setTasks(refreshedTasks);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (
                user &&
                user.id &&
                updatedTask.id &&
                updatedTask.textTask.trim() !== ""
            ) {
                await updateTask(user.id, updatedTask.id, updatedTask);
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
            {user ? (
                <>
                    <a onClick={() => logout()}>
                        {" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#fff"
                        >
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                        </svg>
                        <span>log out</span>
                    </a>
                    {user?.userName || user?.displayName ? (
                        <h2>
                            {user.userName
                                ? `${user.userName}'s Tasks`
                                : `${user.displayName}'s Tasks`}
                        </h2>
                    ) : (
                        <h2> Loading...</h2>
                    )}

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={task.textTask}
                            onChange={(e) =>
                                setTask({ ...task, textTask: e.target.value })
                            }
                        />
                        <button type="submit">Send</button>
                    </form>

                    <TaskContainer>
                        {tasks &&
                            tasks.map((task) => {
                                if (task.id) {
                                    return (
                                        <Test key={task.id}>
                                            <p>{task.textTask}</p>
                                            <div className="actionButtons">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            task.id
                                                                ? task.id
                                                                : ""
                                                        )
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
                                                header={`${
                                                    user.userName
                                                        ? user.userName
                                                        : user.displayName
                                                }'s Tasks`}
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
                                                            onClick={
                                                                handleUpdate
                                                            }
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                }
                                                isOpen={modal}
                                                closeButton="X"
                                                closeButtonPosition="header"
                                                onClose={() => setModal(false)}
                                            >
                                                <textarea
                                                    value={updatedTask.textTask}
                                                    onChange={(e) =>
                                                        setUpdatedTask({
                                                            ...updatedTask,
                                                            textTask:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </PureModal>
                                        </Test>
                                    );
                                }
                                return <h1>Id not found</h1>;
                            })}
                    </TaskContainer>
                </>
            ) : (
                <h2>User not found</h2>
            )}
        </Container>
    );
};

export default Tasks;

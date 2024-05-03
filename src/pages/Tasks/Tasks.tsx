//import { Test } from './Tasks.styles';
import { UserContext } from '../../app/providers/UserProvider';
import { useContext, useEffect, useState } from 'react';
import { TaskType } from '../../common/TaskType';
import { createTask, deleteTask, getTasksById } from '../../app/services/tasks';
import { Container, Test } from './Tasks.styles';

const Tasks = () => {
  const { user } = useContext(UserContext);

  const [task, setTask] = useState<TaskType>({ textTask: "" });
  const [tasks, setTasks] = useState<TaskType[] | null>(null);

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
        const updatedTasks = await getTasksById(user.id);
        setTasks(updatedTasks);
        setTask({ textTask: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      if (id && user.id) {
        await deleteTask(user.id, id);
        if (user && user.id) {
          const updatedTasks = await getTasksById(user.id);
          setTasks(updatedTasks);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Tasks</h2>
      {tasks && tasks.map(task => (
        <Test key={task.id}>
          <p>{task.textTask}</p>
          <button onClick={() => handleDelete(task.id)}>Borrar</button>
          <button>Update</button>
        </Test>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea value={task.textTask} onChange={(e) => setTask({ ...task, textTask: e.target.value })}></textarea>
        <button type='submit'>Send</button>
      </form>
    </Container>
  );
};

export default Tasks;

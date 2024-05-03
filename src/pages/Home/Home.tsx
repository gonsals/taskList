import { useContext, useState } from "react";
import { access } from '../../app/services/tasks';
import { UserContext } from '../../app/providers/UserProvider';
import { UserType } from "../../common/UserType";
import { TestHome } from "./Home.styles";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [userInput, setUserInput] = useState<UserType>({ userName: user.userName, id: user.id });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await access(userInput.userName).then((data) => {
        setUser({ ...user, id: data, userName: userInput.userName });
        setFormSubmitted(true);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, userName: e.target.value });
    setFormSubmitted(false);
  }

  return (
    <TestHome>
      <h4>Introduce tu nombre. Si no está en la base de datos, se creará.</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Name'
          value={userInput.userName}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
      {userInput && <p>{userInput.userName}</p>}
      {formSubmitted && user.id && <p>{user.id}</p>}
    </TestHome>
  );
};

export default Home;

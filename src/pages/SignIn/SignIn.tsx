import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { UserType } from "../../common/UserType";
import { TestHome } from "./SignIn.styles";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from '../../app/services/mailAndPassword';
import toast from "react-hot-toast";

interface ErrorType {
  message: string;
}

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const [userInput, setUserInput] = useState<UserType>({ ...user });
  const [errorMsg, setErrorMsg] = useState<ErrorType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg.message)
    }
  }, [errorMsg]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.password) {
      try {
        const data = await signUp(userInput.email, userInput.password);
        setUser({ ...user, id: data, email: userInput.email });
        navigate("/logIn")
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMsg(error);
        }
      }
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  return (
    <TestHome>
      <h4>
        Introduce tu nombre. Si no está en la base de datos, se creará.
      </h4>
      <form onSubmit={handleSubmit}>
        <h3>SignIn</h3>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userInput.email || ''}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userInput.password || ''}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
        <Link to={"/logIn"}>Tengo una jefe</Link>
      </form>
    </TestHome>
  );
};

export default SignIn;

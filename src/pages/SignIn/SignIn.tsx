import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { UserType } from "../../common/UserType";
import { TestHome } from "./SignIn.styles";
import { Link } from "react-router-dom";
import { signUp } from "../../app/services/mailAndPassword";
import toast from "react-hot-toast";

interface ErrorType {
    message: string;
}

const SignIn = () => {
    const { user, setUser } = useContext(UserContext);
    const [userInput, setUserInput] = useState<UserType>({ ...user });
    const [errorMsg, setErrorMsg] = useState<ErrorType>();


    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg.message);
        }
    }, [errorMsg]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userInput.password) {
            try {
                const data = await signUp(userInput.email, userInput.password);
                setUser({ id: data, email: userInput.email, userName: userInput.userName });

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
            [name]: value,
        });
    };

    return (
        <TestHome>
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={userInput.email || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userInput.password || ""}
                    onChange={handleInputChange}
                />
                <button type="submit">Send</button>
                <Link to={"/logIn"}>Tengo una jefe</Link>
            </form>
        </TestHome>
    );
};

export default SignIn;

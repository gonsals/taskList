import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { UserType } from "../../common/UserType";
import { signUp } from "../../app/services/mailAndPassword";
import toast from "react-hot-toast";
import { TestHome, Form } from "../LogIn/LogIn.styles";

interface ErrorType {
    message: string;
}

const SignIn = ({
    children,
    position,
}: {
    children: React.ReactNode;
    position: number;
}) => {
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
                setUser({
                    id: data,
                    email: userInput.email,
                    userName: userInput.userName,
                });
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
            <Form position={position} onSubmit={handleSubmit}>
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
                {children}
            </Form>
        </TestHome>
    );
};

export default SignIn;

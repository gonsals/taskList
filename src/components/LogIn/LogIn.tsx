import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { UserType } from "../../common/UserType";
import { TestHome, Form } from "./LogIn.styles";
import { signIn } from "../../app/services/mailAndPassword";
import toast from "react-hot-toast";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { loginWithGoogle } from "../../app/services/googleLogIn";
import { getUserById } from "../../app/services/tasks";

interface ErrorType {
    message: string;
}

const LogIn = ({
    children,
    position,
}: {
    children: React.ReactNode;
    position: number;
}) => {
    const [userInput, setUserInput] = useState<UserType>({
        email: "",
        password: "",
    });
    const { setUser } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState<ErrorType | null>(null);

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg.message);
        }
    }, [errorMsg]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (userInput.password) {
                const data = await signIn(userInput.email, userInput.password);
                if (data) {
                    const userObj = await getUserById(data);
                    userObj && setUser(userObj);
                    toast.success("Logged in successfully!");
                }
            }
        } catch (error) {
            console.error("Error signing in:", error);
            if (error instanceof Error) {
                setErrorMsg({ message: error.message });
            }
        }
    };

    const handleSubmitGoogle = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        try {
            const data = await loginWithGoogle();
            setUser({
                id: data.uid,
                email: data.email || "",
                displayName: data.displayName || "",
            });
            toast.success("Logged in with Google successfully!");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            if (error instanceof Error) {
                setErrorMsg({ message: error.message });
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
                <h3>Log in</h3>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={userInput.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userInput.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Log in</button>
                <GoogleSignInButton onClick={handleSubmitGoogle} />
                {children}
            </Form>
        </TestHome>
    );
};

export default LogIn;

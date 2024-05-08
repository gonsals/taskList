import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { UserType } from "../../common/UserType";
import { TestHome } from "./LogIn.styles";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../app/services/mailAndPassword";
import toast from "react-hot-toast";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { loginWithGoogle } from "../../app/services/googleLogIn";

interface ErrorType {
    message: string;
}

const LogIn = () => {
    const { user, setUser } = useContext(UserContext);
    const [userInput, setUserInput] = useState<UserType>({ ...user });
    const [errorMsg, setErrorMsg] = useState<ErrorType>();
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg.message);
        }
    }, [errorMsg]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userInput.password) {
            try {
                toast.promise(
                    signIn(userInput.email, userInput.password).then((data) => {
                        data &&
                            setUser({
                                ...user,
                                id: data,
                                email: userInput.email,
                            });

                        console.log(user);
                        console.log(data);

                        navigate("/tasks");
                    }),
                    {
                        loading: "Saving...",
                        success: <b>Looking tasks!</b>,
                        error: <b>Bad Request </b>,
                    }
                );
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMsg({ message: error.message });
                }
            }
        }
    };

    const handleSubmitGoogle = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        try {
            toast.promise(
                loginWithGoogle().then((data) => {
                    setUser({
                        id: data.uid,
                        email: data.email || "",
                    });
                    navigate("/tasks");
                }),
                {
                    loading: "Loging...",
                    success: <b>Looking tasks!</b>,
                    error: <b>Bad Request </b>,
                }
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMsg(error);
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
                <h3>LogIn</h3>
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
                <GoogleSignInButton onClick={handleSubmitGoogle} />
                <Link to={"/signIn"}>Create account</Link>
            </form>
        </TestHome>
    );
};

export default LogIn;

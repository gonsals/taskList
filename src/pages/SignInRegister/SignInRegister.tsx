import { useState } from "react";
import LogIn from "../../components/LogIn/index";
import Register from "../../components/Register";

const SignInRegister = () => {
    const [showRegister, setShowRegister] = useState<boolean>(false);

    return (
        <>
            {showRegister ? (
                <Register position={+showRegister}>
                    <a
                        id="changeButton"
                        onClick={() => setShowRegister(!showRegister)}
                    >
                        {showRegister ? "Register" : "Sign in"}
                    </a>
                </Register>
            ) : (
                <LogIn position={+showRegister}>
                    <a
                        id="changeButton"
                        onClick={() => setShowRegister(!showRegister)}
                    >
                        {showRegister ? "Register" : "Sign in"}
                    </a>
                </LogIn>
            )}
        </>
    );
};

export default SignInRegister;

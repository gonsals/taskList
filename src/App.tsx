import Router from "./app/router/Router.jsx";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useContext } from "react";
import { auth } from "./app/services/firebase.js";
import { UserContext } from "./app/providers/UserProvider";
import { getUserById } from "./app/services/tasks";
import SignInRegister from "./pages/SignInRegister/index.js";

const App = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const getObj = async () => await getUserById(user.uid);
                getObj().then((obj) => {
                    obj && setUser(obj);
                });
            } else {
                console.log("No user logged");
                setUser({ userName: "", email: "" });
            }
        });

        return () => unsubscribe();
    }, [setUser]);

    if (user.email === "") {
        return <SignInRegister />;
    } else {
        return <Router />;
    }
};

export default App;

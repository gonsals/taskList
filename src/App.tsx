import Router from "./app/router/Router.jsx";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useContext } from 'react';
import { auth } from "./app/services/firebase.js";
import { UserContext } from './app/providers/UserProvider';
import LogIn from "./pages/LogIn/index.js";
import { getUserById } from './app/services/tasks';

const App = () => {

    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log('33333333333', user)
                const getObj = async () => await getUserById(user.uid)
                console.log('44444444', getObj)
                getObj().then((obj) => {
                    console.log('555555555', obj)
                    obj && setUser(obj)
                }
                )
            }
            else {
                console.log("No user logged");
                setUser({ userName: "", email: "" });
            }
        });

        return () => unsubscribe();
    }, []);


    return user ? <Router /> : <LogIn />
};

export default App;

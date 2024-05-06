import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Tasks from "../../pages/Tasks/index";
import LogIn from "../../pages/LogIn";
import SignIn from "../../pages/SignIn";

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/" element={<Navigate to="/logIn" />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </Router>
);

export default AppRouter;

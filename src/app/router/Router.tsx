import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "../../pages/Tasks/index";
import LogIn from "../../pages/SignInRegister/index";
import SignInRegister from "../../pages/SignInRegister/SignInRegister";

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/register" element={<SignInRegister />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </Router>
);

export default AppRouter;

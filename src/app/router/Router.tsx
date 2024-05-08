import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "../../pages/Tasks/index";
import LogIn from "../../pages/LogIn";
import SignIn from "../../pages/SignIn";

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/signIn" element={<SignIn />} />
            {/* <Route path="/" element={<LogIn />} /> */}
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </Router>
);

export default AppRouter;

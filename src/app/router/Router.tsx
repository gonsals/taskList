import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/index";
import LayoutNav from "../Layout/LayoutNav/index";
import Tasks from "../../pages/Tasks/index";
const Router = () => (
    <BrowserRouter>
        <LayoutNav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </LayoutNav>
    </BrowserRouter>
);

export default Router;

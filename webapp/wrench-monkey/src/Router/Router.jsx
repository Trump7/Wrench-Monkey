import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Manual from "../Pages/Manual";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Manager from "../Pages/Manager";
import UserDashboard from "../Pages/UserDashboard";
import AdminRoute from "../components/AdminRoute";
import UserRoute from "../components/UserRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/manual", element: <Manual /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/manager", element: <AdminRoute><Manager /></AdminRoute> },
            { path: "/user-dashboard", element: <UserRoute><UserDashboard /></UserRoute> }
        ]
    }
]);

export default router;

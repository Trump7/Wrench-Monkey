import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Manual from "../Pages/Manual";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Manager from "../Pages/Manager";
import PrivateRoute from '../components/PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/about", element: <About/>},
            {path: "/manual", element: <Manual/>},
            {path: "/login", element: <Login/>},
            {path: "/register", element: <Register/>},
            {path: "/manager", element: <PrivateRoute><Manager/></PrivateRoute>},
        ]
    },
]);

export default router;
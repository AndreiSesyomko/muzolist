import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import {Navigate} from "react-router-dom";


export const publicRoutes = [
    { path: LOGIN_ROUTE, element: <Auth/>, exact: true },
    { path: REGISTRATION_ROUTE, element: <Auth />, exact: true },
    { path: MAIN_ROUTE, element: <Main/>, exact: true },
    {path: "*", element: <Navigate to={"/"}/>, exact: true}
]

export const authRoutes = []
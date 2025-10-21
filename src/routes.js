import {AUTH_ROUTE, FAVOURITE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import {Navigate} from "react-router-dom";
import Favourites from "./pages/Favourites";


export const publicRoutes = [
    { path: AUTH_ROUTE, element: <Auth/>, exact: true },
    { path: MAIN_ROUTE, element: <Main/>, exact: true },
    { path: FAVOURITE_ROUTE, element: <Favourites/>, exact: true },
    {path: "*", element: <Navigate to={"/"}/>, exact: true}
]

export const authRoutes = []
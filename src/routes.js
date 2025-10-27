import {AUTH_ROUTE, FAVOURITE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, POSTS_ROUTE, RECOMENDATIONS_ROUTE, REGISTRATION_ROUTE} from "./consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import {Navigate} from "react-router-dom";
import Favourites from "./pages/Favourites";
import Posts from "./pages/Posts";
import Recomendations from "./pages/Recomendations";


export const publicRoutes = [
    { path: AUTH_ROUTE, element: <Auth/>, exact: true },
    { path: MAIN_ROUTE, element: <Main/>, exact: true },
    { path: FAVOURITE_ROUTE, element: <Favourites/>, exact: true },
    { path: POSTS_ROUTE, element: <Posts/>, exact: true },
    { path: RECOMENDATIONS_ROUTE, element: <Recomendations/>, exact: true },
    {path: "*", element: <Navigate to={"/"}/>, exact: true}
]

export const authRoutes = []
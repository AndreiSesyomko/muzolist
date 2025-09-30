import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";


const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {
                user.isAuth() && authRoutes.map(route =>
                    <Route exact={route.exact}
                           path={route.path}
                           element={route.element}
                           key={route.path} />
                )
            }
            {
                publicRoutes.map(route =>
                    <Route exact={route.exact}
                           path={route.path}
                           element={route.element}
                           key={route.path} />
                )
            }
        </Routes>
    );
})

export default AppRouter;
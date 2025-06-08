import {ADMIN_ROUTE,  LOGIN_ROUTE, PUBLIC_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import DashBoardPublic from "./pages/DashBoardPublic";
import DashBoardAdmin from "./pages/DashBoardAdmin";

export const adminRoutes= [
    {
        path: ADMIN_ROUTE,
        Component:DashBoardAdmin
    }
]
export const publickRoutes= [
    {
        path: PUBLIC_ROUTE,
        Component:DashBoardPublic
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
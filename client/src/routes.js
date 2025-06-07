import {ADMIN_ROUTE, DASHBOARD_ADMIN_ROUTE, DASHBOARD_PUBLIC_ROUTE,LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utills/constants";
import Auth from "./pages/Auth";
import DashBoardPublic from "./pages/DashBoardPublic";
import DashBoardAdmin from "./pages/DashBoardAdmin";

export const authRotes= [
    {
        path: ADMIN_ROUTE,
        Component:Admin
    },
    {
        path: DASHBOARD_ADMIN_ROUTE,
        Component:DashBoardAdmin
    }
]
export const publickRotes= [
    {
        path: DASHBOARD_PUBLIC_ROUTE,
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
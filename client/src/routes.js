import {
    ADMIN_ROUTE,
    COMPANY_ROUTE,
    COMPANY_EDIT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, USER_EDIT_ROUTE, USER_ROUTE, ROOT_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import DashBoardPublic from "./pages/DashBoardPublic";
import DashBoardAdmin from "./pages/DashBoardAdmin";
import CreateCompany from "./components/modals/CreateCompany";
import EditCompany from "./components/modals/EditCompany";
import EditProfile from "./components/modals/EditProfile";
import Root from "./components/Root";

export const adminRoutes= [
    {
        path: ROOT_ROUTE,
        Component: Root
    },
    {
        path: ADMIN_ROUTE,
        Component:DashBoardAdmin
    },
    {
        path: USER_ROUTE,
        Component:DashBoardPublic
    },
    {
        path: COMPANY_ROUTE,
        Component: CreateCompany
    },
    {
        path: COMPANY_EDIT_ROUTE,
        Component: EditCompany
    },
    {
        path: USER_EDIT_ROUTE,
        Component: EditProfile
    } ,

]
export const publicRoutes= [
    {
        path: ROOT_ROUTE,
        Component: Auth
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
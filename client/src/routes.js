import {
    ADMIN_ROUTE,
    COMPANY_ROUTE,
    COMPANY_EDIT_ROUTE,
    LOGIN_ROUTE,
    PUBLIC_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import DashBoardPublic from "./pages/DashBoardPublic";
import DashBoardAdmin from "./pages/DashBoardAdmin";
import CreateCompany from "./components/modals/CreateCompany";
import EditCompany from "./components/modals/EditCompany";

export const adminRoutes= [
    {
        path: ADMIN_ROUTE,
        Component:DashBoardAdmin
    }

]
export const publicRoutes= [
    {
        path: PUBLIC_ROUTE,
        Component:DashBoardPublic
    },
    {
        path: COMPANY_ROUTE,
        Component: CreateCompany
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: COMPANY_EDIT_ROUTE,
        Component: EditCompany
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
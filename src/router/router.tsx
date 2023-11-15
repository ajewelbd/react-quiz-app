import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/login";
import AuthGuard from "./auth-guard";

const routes = [
    {
        path: "/",
        element: <AuthGuard></AuthGuard>
    },
    {
        path: "/login",
        element: <Login />
    }
]

const router = createBrowserRouter(routes)

export default router;
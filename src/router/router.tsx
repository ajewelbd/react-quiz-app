import { createBrowserRouter } from "react-router-dom";
import Answers from "../answers/answers";
import Questions from "../questions/questions";
import Login from "../auth/login";
import AuthGuard from "./auth-guard";

const routes = [
    {
        path: "/",
        element: <AuthGuard><Answers /></AuthGuard>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/questions",
        element: <AuthGuard><Questions /></AuthGuard>
    }
]

const router = createBrowserRouter(routes)

export default router;
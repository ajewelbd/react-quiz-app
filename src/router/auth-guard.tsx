import { Navigate } from "react-router-dom";
import { isValidUser } from "../helpers/helpers";

export default function AuthGuard({ children }: {children: React.ReactNode}) {
    if (!isValidUser()) return <Navigate to="/login" />

    return children;
}
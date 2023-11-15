import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../helpers/helpers";
import Answers from "../answers/answers";
import Questions from "../questions/questions";
import Layout from "../layouts/layout";

export default function AuthGuard() {
    const user = getCurrentUser();
    if (!user) return <Navigate to="/login" />
    
    return <Layout>{ user.role == "admin" ? <Questions /> : <Answers />}</Layout>
}
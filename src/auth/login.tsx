import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, getUser, saveToStorage } from "../helpers/helpers";


export default function Login() {
    const loggedUser = getCurrentUser();
    if(loggedUser) return (<Navigate to={loggedUser.homePage} />);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [isWrongCredentials, setIsWrongCredentials] = useState(false);
    const navigate = useNavigate();

    const handleCredentials = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const login = (e: FormEvent) => {
        e.preventDefault();
        setIsWrongCredentials(false);
        const validUser = getUser(credentials.username, credentials.password);
        if (validUser) {
            saveToStorage("token", `${credentials.username}:${credentials.password}`)
            navigate(validUser.homePage);
        } else {
            setIsWrongCredentials(true);
        }
    }

    return (
        <>
            <div className="grid place-items-center h-screen bg-white">
                <form onSubmit={login}>
                    <div className="flex flex-col w-80">
                        <div className="mb-11">
                            <h3 className="mb-5 text-4xl font-extrabold text-dark-grey-900 text-center">Sign In</h3>
                            <hr className="h-0 border-b border-solid border-grey-500 grow" />
                        </div>
                        {isWrongCredentials && (<p className="text-center text-red-500 text-sm">Wrong credentials!</p>)}
                        <input type="text" name="username" id="username" className="h-5 px-4 py-5 w-full flex items-center text-sm font-medium mt-1 mb-5 bg-blue-50 rounded-2xl focus:bg-blue-100 outline-none text-gray-700" placeholder="username" onChange={handleCredentials}/>
                        <input type="password" name="password" id="password" className="h-5 px-4 py-5 w-full flex items-center text-sm font-medium mb-7 bg-blue-50 rounded-2xl focus:bg-blue-100 outline-none text-gray-700" placeholder="password" onChange={handleCredentials}/>
                        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-2xl text-sm font-medium">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
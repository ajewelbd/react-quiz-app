import { useNavigate } from "react-router-dom";
import { removeFormStorage } from "../helpers/helpers";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Layout({ children }: {children: React.ReactNode}) {
    const navigate = useNavigate();
    const logout = () => {
        removeFormStorage("token");
        navigate("/login");
    }

    return (
        <>
            <div className="flex flex-col gap-y-11 items-center">
                <nav className="bg-gray-800 w-full">
                    <div className="mx-auto px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-shrink-0">
                                <img className="h-8 w-auto rounded" src="/quiz-logo.png" alt="Your Company" />
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={logout}>
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Logout</span>
                                    <ArrowLeftOnRectangleIcon className="w-6 h-6"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container px-5 lg:px-0 md:px-0">
                    {children}
                </div>
            </div>
        </>
    )
}
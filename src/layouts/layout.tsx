import { useNavigate } from "react-router-dom";
import { removeFormStorage } from "../helpers/helpers";

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
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={logout}>
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Logout</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
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
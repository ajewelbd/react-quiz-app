import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { getCurrentUser, loadQuestions } from "../helpers/helpers";
import { Question } from "../types/Question";
import { User } from "../types/User";

type StateContext = {
    questions: Question[],
    setQuestions: Dispatch<SetStateAction<Question[]>>,
    currentUser: User
}

export const StateContext = createContext<StateContext>({
    questions: [],
    setQuestions: () => {},
    currentUser: {
        id: 0,
        name: "",
        role: "",
        username: "",
        password: "",
        homePage: ""
    }
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [questions, setQuestions] = useState<Question[]>(loadQuestions())
    const currentUser = getCurrentUser() as User;
    
    return (
        <StateContext.Provider value={{
            questions,
            setQuestions,
            currentUser
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useGlobalStateContext = () => useContext(StateContext);
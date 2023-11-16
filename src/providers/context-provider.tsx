import React, { createContext, useContext, useState } from "react";
import { getCurrentUser, loadQuestions, refreshQuestionStorage } from "../helpers/helpers";
import { Question } from "../types/Question";
import { User } from "../types/User";

type StateContext = {
    questions: Question[],
    updateQuestions: (questions: Question[]) => void 
    currentUser: User
}

export const StateContext = createContext<StateContext>({
    questions: [],
    updateQuestions: () => {},
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
            updateQuestions: (questions) => {
                setQuestions(questions);
                refreshQuestionStorage(questions);
            },
            currentUser
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useGlobalStateContext = () => useContext(StateContext);
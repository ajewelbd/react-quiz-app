import { defaultQuestions, users } from "../mock-data";
import { Question } from "../types/Question";

export const uuid = () => crypto.randomUUID();
export const saveToStorage = (key: string, value: string) => localStorage.setItem(key, value) as unknown;
export const removeFormStorage = (key: string) => localStorage.removeItem(key);
export const getFromStorage = (key: string) => localStorage.getItem(key);

export const findUser = (username: string, password: string) => users.find(user => user.username === username && user.password === password);

export const getCurrentUser = () => {
    const token = getFromStorage("token") as string;
    return users.find(user => `${user.username}:${user.password}` === token)
};

export const isValidUser = () => {
    return getCurrentUser() ? true : false;
};

export const getUserById = (id: number) => users.find(user => user.id === id);


export const getRandomColor = () => {
    const number = Math.floor(Math.random() * 10);
    const colors = [
        "bg-slate-500",
        "bg-red-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-rose-500",
        "bg-violet-500",
    ];

    return colors[number];
}

export const loadQuestions = () => {
    const questions = getFromStorage("questions");
    try {
        if (questions) {
            return JSON.parse(questions);
        } else {
            saveToStorage("questions", JSON.stringify(defaultQuestions));
            return defaultQuestions;
        }
    } catch(e: unknown) {
        return [];
    }
}

export const refreshQuestionStorage = (questions: Question[]) => {
    saveToStorage("questions", JSON.stringify(questions));
}
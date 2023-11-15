import { users } from "../mock-data";

export const saveToStorage = (key: string, value: string) => localStorage.setItem(key, value) as unknown;
export const getFormStorage = (key: string) => localStorage.getItem(key);

export const getUser = (username: string, password: string) => users.find(user => user.username === username && user.password === password);

export const getCurrentUser = () => {
    const token = getFormStorage("token") as string;
    return users.find(user => `${user.username}:${user.password}` === token)
};

export const isValidUser = () => {
    return getCurrentUser() ? true : false;
};
import { Answer } from "./Answer";

type Question = {
    id: string;
    title: string;
    answers: Array<Answer>
}

export type { Question };
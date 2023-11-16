import { useState } from "react";
import { Question } from "../types/Question";
import { refreshQuestionStorage, uuid } from "../helpers/helpers";
import { useGlobalStateContext } from "../providers/context-provider";

type NewQuestionProps = {
    questionId?: string;
    oldTitle?: string;
    dialogRef: any;
}

export default function QuestionForm({ questionId = "", oldTitle = "", dialogRef }: NewQuestionProps) {
    const [title, setTitle] = useState(oldTitle);
    const { questions, setQuestions } = useGlobalStateContext();

    const closeDialog = () => {
        dialogRef.current?.close();
        setTitle("")
    }

    const add = () => {
        const question = {
            id: uuid(),
            title,
            answers: []
        }

        const updatedQuestions = [...questions, question];
        refreshQuestionStorage(updatedQuestions)
        setQuestions((updatedQuestions) => {
            return updatedQuestions
        })
        
    }

    const update = () => {
        setQuestions((questions) => {
            const updatedQuestions = questions.map(question => {
                if(question.id === questionId) {
                    question.title = title
                }
                return question;
            })

            refreshQuestionStorage(updatedQuestions)
            return updatedQuestions;
        })
    }

    const save = () => {
        if (title) {
            if (questionId) update()
            else add()
        
            closeDialog();
        }
    }
    
    return (
        <>
            <div className="flex flex-col justify-center items-center w-96">
                <textarea className="border p-3 outline-none mb-3 w-full rounded-lg text-sm font-medium text-gray-800" rows={5} placeholder="What is the height of Burz Khalifa?" onChange={({ target }) => setTitle(target.value)} value={title}></textarea>
                <div className="flex gap-x-5">
                    <button className="py-2 px-7 text-white bg-blue-500 rounded-2xl text-sm font-medium" onClick={save} disabled={!title}>Save</button>
                    <button className="py-2 px-7 text-white bg-zinc-800 rounded-2xl text-sm font-medium" onClick={closeDialog}>Close</button>
                </div>
            </div>
        </>
    )
}
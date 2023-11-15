import { Dispatch, SetStateAction, useState } from "react";
import { Question } from "../types/Question";
import { refreshQuestionStorage, uuid } from "../helpers/helpers";

type NewQuestionProps = {
    questionId?: string;
    oldTitle?: string
    setQuestions: Dispatch<SetStateAction<Question[]>>,
    dialogRef: any
}

export default function QuestionForm({ questionId = "", oldTitle = "",setQuestions, dialogRef }: NewQuestionProps) {
    const [title, setTitle] = useState(oldTitle);

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
        setQuestions((questions) => {
            const updatedQuestions = [...questions, question];
            refreshQuestionStorage(updatedQuestions)
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
            <div className="flex flex-col justify-center items-center">
                <textarea className="border p-3 outline-none mb-3 w-64 rounded-lg text-sm font-medium text-gray-800" rows={3} placeholder="What is the height of Burz Khalifa?" onChange={({ target }) => setTitle(target.value)} value={title}></textarea>
                <div className="flex gap-x-5">
                    <button className="py-2 px-7 text-white bg-blue-500 rounded-2xl text-sm font-medium" onClick={save} disabled={!title}>Save</button>
                    <button className="py-2 px-7 text-white bg-teal-500 rounded-2xl text-sm font-medium" onClick={closeDialog}>Close</button>
                </div>
            </div>
        </>
    )
}
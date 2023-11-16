import { useState } from "react";
import { Answer } from "../types/Answer";
import { addInHistory, uuid } from "../helpers/helpers";
import { useGlobalStateContext } from "../providers/context-provider";
import AnswerHistory from "./answer-history";

type NewQuestionProps = {
    answer: Answer;
    questionId: string;
    dialogRef: any
}

export default function AnswerForm({ answer, questionId, dialogRef }: NewQuestionProps) {
    const isNew = answer ? false : true;
    const { currentUser, questions, updateQuestions } = useGlobalStateContext()
    const [text, setText] = useState(isNew ? "" : answer.text);

    const closeDialog = () => {
        dialogRef.current?.close();
    }

    const add = () => {
        const newAnswer = {
            id: uuid(),
            text: text,
            userId: currentUser.id
        }

        const updatedQuestions = questions.map(question => {
            if(question.id === questionId) {
                question.answers.push(newAnswer)
            }

            return question;
        })

        updateQuestions(updatedQuestions)
    }

    const update = () => {
        const updatedQuestions = questions.map(question => {
            if(question.id === questionId) {
                question.answers.forEach(currentAnswer => {
                    if(currentAnswer.id === answer.id) {
                        updateHistory(currentAnswer.text)
                        currentAnswer.text = text;
                    }
                })
            }

            return question;
        })

        updateQuestions(updatedQuestions)
    }

    const save = () => {
        if (text) {
            if (isNew) add()
            else update()
        
            closeDialog();
        }
    }

    const updateHistory = (text: string) => {
        const history = {
            id: uuid(),
            userId: currentUser.id,
            questionId,
            text
        }

        addInHistory(history);
    }
    
    return (
        <>
            <div className="flex flex-col justify-center items-center w-96">
                <textarea className="border p-3 outline-none mb-3 w-full rounded-lg text-sm font-medium text-gray-800" rows={5} placeholder="What is the height of Burz Khalifa?" onChange={({ target }) => setText(target.value)} value={text}></textarea>
                <div className="flex gap-x-5">
                    <button className="py-2 px-7 text-white bg-blue-500 rounded-2xl text-sm font-medium" onClick={save} disabled={!text}>Save</button>
                    <button className="py-2 px-7 text-white bg-zinc-800 rounded-2xl text-sm font-medium" onClick={closeDialog}>Close</button>
                </div>
            </div>
            {!isNew && (<AnswerHistory questionId={questionId}/>)}
        </>
    )
}

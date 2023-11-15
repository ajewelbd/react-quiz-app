import { useEffect, useRef, useState } from "react";
import { getCurrentUser, loadQuestions } from "../helpers/helpers";
import { Question as QuestionType} from "../types/Question"
import Question from "./question";
import QuestionForm from "./question-form";

export default function Questions() {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    
    const currentUser = getCurrentUser();

    useEffect(() => {
        setQuestions(loadQuestions());
    }, [])

    const addDialog = useRef<HTMLDialogElement>(null)
    const openDialog = () => addDialog.current?.showModal()
    return (
        <>
            <div className="flex flex-col gap-y-7">
                <div className="flex flex-col gap-y-1">
                    <div className="flex justify-between items-center">
                        <div className="text-zinc-900">Welcome, <span className="font-medium">{currentUser?.name}</span></div>
                        <button className="bg-gray-800 px-11 py-3 rounded-lg text-sm font-medium text-white" onClick={openDialog}>Add</button>
                    </div>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <div className="flex flex-col gap-y-3">
                    {!questions.length && (
                        <div className="font-medium text-zinc-900 text-center mt-24">No questions available!</div>
                    )}
                    {questions.map(question => <Question key={question.id} question={question} setQuestions={setQuestions} />)}
                </div>
            </div>

            <dialog ref={addDialog} id="add" className="p-7 rounded-md backdrop:bg-blend-darken">
                <QuestionForm setQuestions={setQuestions} dialogRef={addDialog} />
            </dialog>
        </>
    )
}


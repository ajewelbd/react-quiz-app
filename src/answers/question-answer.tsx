import { Dispatch, SetStateAction, useRef } from "react";
import { Question } from "../types/Question";
import { getCurrentUser } from "../helpers/helpers";
import Answers from "./answers";
import AnswerForm from "./answer-form";
import { Answer as AnswerType} from "../types/Answer";
import Answer from "./answer";

type QuestionAnswerProps = {
    question: Question,
    setQuestions: Dispatch<SetStateAction<Question[]>>
}

export default function QuestionAnswer({ question, setQuestions }: QuestionAnswerProps) {
    const currentUser = getCurrentUser();
    const getUserAnswer = question.answers.find(answer => answer.userId === currentUser?.id) as AnswerType
    
    const dialogRef = useRef<HTMLDialogElement>(null)
    const dialogVisibility = (status = false) => status ? dialogRef.current?.showModal() : dialogRef.current?.close();
    const openDialog = (id: string) => {
        dialogRef.current?.showModal()
    }

    return (
        <>
            <div className="flex flex-col gap-y-1 border rounded-lg py-1 px-3">
                <div className="flex gap-x-3 items-center">
                    <div className="font-medium text-red-600 text-3xl">Q</div>
                    <div>{question.title}</div>
                </div>
                <div className="flex gap-x-3 items-center">
                    <div className="font-medium text-green-600 text-3xl">A</div>
                    <Answer answer={getUserAnswer}/>
                </div>
            </div>

            <dialog ref={dialogRef} id="add" className="p-7 rounded-md backdrop:bg-blend-darken">
                <AnswerForm questionId={question.id} setQuestions={setQuestions} dialogRef={dialogRef}/>
                {/* 2<div className="flex flex-col justify-center items-center"> */}
                    {/* <textarea className="border p-3 outline-none mb-3 w-64 rounded-lg text-sm font-medium text-gray-800" rows={3} placeholder="What is the height of Burz Khalifa?" onChange={({ target }) => setTitle(target.value)} value={title}></textarea> */}
                    {/* <div className="flex gap-x-5"> */}
                        {/* <button className="py-2 px-7 text-white bg-blue-500 rounded-2xl text-sm font-medium" onClick={save} disabled={!title}>Save</button>
                        <button className="py-2 px-7 text-white bg-teal-500 rounded-2xl text-sm font-medium" onClick={closeDialog}>Close</button> */}
                    {/* </div> */}
                {/* </div> */}
            </dialog>
        </>
    )
}

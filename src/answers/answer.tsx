import { useRef } from "react";
import { Answer as AnswerType } from "../types/Answer";
import { useGlobalStateContext } from "../providers/context-provider";
import AnswerForm from "./answer-form";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Answer({ answers, questionId }: { answers: AnswerType[], questionId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const dialogVisibility = (status = false) => status ? dialogRef.current?.showModal() : dialogRef.current?.close();

    const  { currentUser } = useGlobalStateContext();

    const answer = answers.find(answer => answer.userId === currentUser?.id) as AnswerType;

    return (
        <>
            {answer?.text === undefined ?
                (<button className="px-5 py-1 text-sm font-medium text-white bg-blue-600 rounded-2xl" onClick={() => dialogVisibility(true)}>Click to answer</button>)
                :
                (
                    <div className="flex justify-between w-full">
                        <div>{answer?.text}</div>
                        <button onClick={() => dialogVisibility(true)}>
                            <PencilSquareIcon className="w-5 h-5"/>
                        </button>
                    </div>
                )
            }

            <dialog ref={dialogRef} id="add" className="p-7 rounded-md backdrop:bg-blend-darken">
                <AnswerForm answer={answer} questionId={questionId} dialogRef={dialogRef}/>
            </dialog>
        </>
    )
}
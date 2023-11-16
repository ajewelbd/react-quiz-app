import { useRef, useState } from "react";
import { getRandomColor, getUserById } from "../helpers/helpers";
import { Question  } from "../types/Question"
import QuestionForm from "./question-form";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useGlobalStateContext } from "../providers/context-provider";

export default function QuestionDetails({ question }: {question: Question}) {
    const [selectedId, setSelectedId] = useState("");
    const { questions, updateQuestions } = useGlobalStateContext();

    const deleteDialog = useRef<HTMLDialogElement>(null)
    const openDeleteDialog = (id: string) => {
        setSelectedId(id)
        deleteDialog.current?.showModal();
    }

    const closeDeleteDialog = () => deleteDialog.current?.close()

    const remove = () => {
        const updatedQuestions = questions.filter(question => question.id != selectedId)
        updateQuestions(updatedQuestions)
        setSelectedId("")
        closeDeleteDialog();
    }

    const editDialog = useRef<HTMLDialogElement>(null)

    const openEditDialog = (id: string) => {
        setSelectedId(id);
        editDialog.current?.showModal();
    }

    return (
        <>
            <div className="border rounded p-3 shadow">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span>{question.title}</span>
                        <div className="flex gap-x-1 items-center">
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                            <button onClick={() => openEditDialog(question.id)}>
                                <PencilSquareIcon className="w-5 h-5"/>
                            </button>
                            <button onClick={() => openDeleteDialog(question.id)}>
                                <TrashIcon className="w-5 h-5 text-red-600"/>
                            </button>
                        </div>
                    </summary>
                    <div className="mt-3 group-open:animate-fadeIn flex flex-col gap-y-1">
                        {!question.answers.length && (
                            <div className="font-medium text-zinc-600 text-center">No answers given yet!</div>
                        )}
                        {question.answers.map(answer => (
                            <div key={answer.id} className="flex gap-x-3 bg-slate-100 py-1 px-2 rounded-lg">
                                <div className={`self-center text-sm font-medium text-white py-1.5 px-3 rounded-lg ${getRandomColor()}`}>{getUserById(answer.userId)?.name.charAt(0)}</div>
                                <div className="flex flex-col">
                                    <p className="text-zinc-800 font-medium text-sm">{getUserById(answer.userId)?.name}</p>
                                    <p className="text-neutral-600 text-sm">{answer.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            </div>

            <dialog ref={editDialog} id="add" className="p-7 rounded-md backdrop:bg-blend-darken">
                <QuestionForm questionId={selectedId} oldTitle={question.title} dialogRef={editDialog} />
            </dialog>

            <dialog ref={deleteDialog} id="delete" className="rounded-md backdrop:bg-blend-darken">
                <div className="flex flex-col gap-y-16 justify-center items-center w-64 h-48">
                    <p className="font-medium text-zinc-800">Are you sure?</p>
                    <div className="flex gap-x-5">
                        <button className="py-2 px-7 text-white bg-green-500 rounded-2xl text-sm font-medium" onClick={remove}>Yes</button>
                        <button className="py-2 px-7 text-white bg-red-500 rounded-2xl text-sm font-medium" onClick={closeDeleteDialog}>No</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { getRandomColor, getUserById, refreshQuestionStorage } from "../helpers/helpers";
import { Question as QuestionType} from "../types/Question"
import QuestionForm from "./question-form";

type QuestionProps = {
    question: QuestionType,
    setQuestions: Dispatch<SetStateAction<QuestionType[]>>
}

export default function Question({ question, setQuestions }: QuestionProps) {
    const [selectedId, setSelectedId] = useState("");

    const deleteDialog = useRef<HTMLDialogElement>(null)
    const openDeleteDialog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.preventDefault();
        setSelectedId(id)
        deleteDialog.current?.showModal();
    }

    const closeDeleteDialog = () => deleteDialog.current?.close()

    const remove = () => {
        setQuestions(previousState => {
            const questions = previousState.filter(question => question.id != selectedId)
            refreshQuestionStorage(questions);
            return questions
        })
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
            <div className="border rounded p-3">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span>{question.title}</span>
                        <div className="flex gap-x-1 items-center">
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                            <button onClick={() => openEditDialog(question.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button onClick={event => openDeleteDialog(event, question.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </summary>
                    <div className="mt-3 group-open:animate-fadeIn flex flex-col gap-y-1">
                        {!question.answers.length && (
                            <div className="font-medium text-zinc-900 text-center">No answers given yet!</div>
                        )}
                        {question.answers.map(answer => (
                            <div key={answer.id} className="flex gap-x-3 bg-slate-100 py-1 px-2 rounded-lg">
                                <div className={`self-center text-sm font-medium text-white py-3.5 px-5 rounded-full ${getRandomColor()}`}>{getUserById(answer.userId)?.name.charAt(0).toUpperCase()}</div>
                                <div className="flex flex-col gap-y-0.5">
                                    <div className="text-gray-950 font-semibold">{getUserById(answer.userId)?.name}</div>
                                    <p className="text-neutral-600">{answer.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            </div>

            <dialog ref={editDialog} id="add" className="p-7 rounded-md backdrop:bg-blend-darken">
                <QuestionForm questionId={selectedId} oldTitle={question.title} setQuestions={setQuestions} dialogRef={editDialog} />
            </dialog>

            <dialog ref={deleteDialog} id="delete" className="p-7 rounded-md backdrop:bg-blend-darken">
                <div className="flex flex-col justify-center items-center">
                    <p className="mb-7 font-medium text-zinc-800">Are you sure?</p>
                    <div className="flex gap-x-5">
                        <button className="py-2 px-7 text-white bg-green-500 rounded-2xl text-sm font-medium" onClick={remove}>Yes</button>
                        <button className="py-2 px-7 text-white bg-red-500 rounded-2xl text-sm font-medium" onClick={closeDeleteDialog}>No</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
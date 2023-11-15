import { useEffect, useState } from "react";
import { getCurrentUser, loadQuestions } from "../helpers/helpers";
import { Question } from "../types/Question";
import QuestionAnswer from "./question-answer";

export default function Answers() {
    const [questions, setQuestions] = useState<Question[]>([])
    
    const currentUser = getCurrentUser();

    useEffect(() => {
        setQuestions(loadQuestions());
    }, [])
    return (
        <>
            <div className="flex flex-col gap-y-7">
                <div className="flex flex-col gap-y-1">
                    <div className="text-zinc-900">Welcome, <span className="font-medium">{currentUser?.name}</span></div>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <div className="flex flex-col gap-y-3">
                    {!questions.length && (
                        <div className="font-medium text-zinc-900 text-center mt-24">No questions available!</div>
                    )}
                    {questions.map(question => <QuestionAnswer key={question.id} question={question} setQuestions={setQuestions} />)}
                </div>
            </div>
        </>
    )
}
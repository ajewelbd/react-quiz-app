import { useGlobalStateContext } from "../providers/context-provider";
import Answer from "./answer";

export default function Answers() {
    const { questions, currentUser } = useGlobalStateContext();

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
                    {questions.map(question => (
                        <div key={question.id} className="flex flex-col gap-y-1 border rounded-lg py-1 px-3 bg-zinc-50 shadow">
                            <div className="flex gap-x-3 items-center">
                                <div className="font-medium text-red-600 text-3xl">Q</div>
                                <div>{question.title}</div>
                            </div>
                            <div className="flex gap-x-3 items-center">
                                <div className="font-medium text-green-600 text-3xl">A</div>
                                <Answer answers={question.answers} questionId={question.id}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
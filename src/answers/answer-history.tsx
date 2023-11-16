import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { loadAnswerHistory, uuid } from "../helpers/helpers"
import { useGlobalStateContext } from "../providers/context-provider";
import { AnswerHistory as AnswerHistoryType } from "../types/AnswerHistory";

export default function AnswerHistory({ questionId }: { questionId:  string}) {
    const historiesFormStorage = loadAnswerHistory() as AnswerHistoryType[];
    const { currentUser } = useGlobalStateContext();
    const histories = historiesFormStorage?.filter(history => history.userId === currentUser.id && history.questionId === questionId)

    return (
        <>
            {histories.length > 0 &&
                (
                    <div className="mt-9">
                    <p className="mb-1 text-sm text-zinc-700 font-bold">History</p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    <div className="mt-1 flex flex-col gap-y-1">
                        {histories.map(({ text }) => (
                            <div key={uuid()} className="flex gap-x-1 p-2 rounded bg-zinc-100">
                                <ChevronDoubleRightIcon className="w-5 h-5" />
                                <p className="text-sm font-medium text-gray-700">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )
            }
            
        </>
    )
}
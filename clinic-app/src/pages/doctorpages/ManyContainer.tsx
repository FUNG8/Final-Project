import { useNumberWaitingList } from "../../api/patientAPI"



interface TotalQueue {
    status: string
    result?: string[]
}

export default function ManyContainer() {

    const totalQueue: TotalQueue = useNumberWaitingList()


    return (
        <div className='manyContainer'>
            <div className='smallContainer'>Pending
                <div className='inSmContainer'>{(totalQueue as any).result?.count}</div>
            </div>
            <div className='smallContainer'>Completed
                <div className='inSmContainer'>6</div>
            </div>
        </div>

    )
}
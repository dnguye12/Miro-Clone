"use client"

import { Canvas } from "./_components/canvas"
import { Room } from "@/components/room"
import { Loading } from "./_components/loading"
import { useParams } from "next/navigation"

const BoardIdPage = () => {
    const params = useParams()
    const boardId = typeof params.boardId === "string" ? params.boardId : undefined;

    if (!boardId) {
        return null
    }
    return (
        <Room roomId={boardId} fallback={<Loading />}>
            <Canvas boardId={boardId} />
        </Room>
    )
}

export default BoardIdPage
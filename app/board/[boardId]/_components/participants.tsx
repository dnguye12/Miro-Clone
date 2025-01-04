import { Skeleton } from "@/components/ui/skeleton"
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { UserAvatar } from "./user-avatar"
import { connectionIdToColor } from "@/lib/utils"

const MAX_OTHER = 2

export const Participants = () => {
    const users = useOthers()
    const currentUser = useSelf()

    const hasMoreUsers = users.length > MAX_OTHER

    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_OTHER).map(({ connectionId, info }) => {
                    return (
                        <UserAvatar
                            key={connectionId}
                            src={info?.picture}
                            name={info?.name}
                            fallback={info?.name || "A"}
                            borderColor={connectionIdToColor(connectionId)}
                        />
                    )
                })}
                {
                    currentUser && (
                        <UserAvatar
                            src={currentUser.info?.picture}
                            name={`${currentUser.info?.name} (You)`}
                            fallback={`${currentUser.info?.name} (You)`}
                            borderColor={connectionIdToColor(currentUser.connectionId)}
                        />
                    )
                }
                {
                    hasMoreUsers && (
                        <UserAvatar
                            name={`${users.length - MAX_OTHER} more`}
                            fallback={`+${users.length - MAX_OTHER}`}
                        />
                    )
                }
            </div>
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
            <Skeleton className="w-full h-full bg-muted" />
        </div>
    )
}
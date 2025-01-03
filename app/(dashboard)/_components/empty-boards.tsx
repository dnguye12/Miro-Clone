"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
    const router = useRouter()
    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        if (!organization) {
            return
        }
        mutate({
            title: "Untitled",
            orgId: organization.id
        }).then((id) => {
            toast.success("Board created")
            router.push(`/board/${id}`)
        }).catch(() => toast.error("Failed to create board"))
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Image
                src="/note.svg"
                width={110}
                height={110}
                alt="Empty"
                className="drop-shadow"
            />
            <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
            <p className="text-muted-foreground text-sm mt-2">Start by creating a board for your organization.</p>
            <div className="mt-6">
                <Button disabled={pending} size={"lg"} onClick={onClick}>
                    Create board
                </Button>
            </div>
        </div>
    )
}
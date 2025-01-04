import { poppins } from "@/app/ui/fonts";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import Link from "next/link";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string;
}

export const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal()
    const data = useQuery(api.board.get, { id: boardId as Id<"boards"> })

    if (!data) {
        return <InfoSkeleton />
    }

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to boards" side="bottom" sideOffset={10}>
                <Button asChild className="px-2" variant="board">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            height={28}
                            width={57}

                        />
                        <span className={cn(
                            "font-semibold text-2xl text-black",
                            poppins.className
                        )}>Board</span>
                    </Link>
                </Button>
            </Hint>
            <Separator orientation="vertical" decorative className="bg-neutral-300 h-[28px] mx-1.5 w-0.5" />
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button variant={"board"} className="text-base font-normal px-2" onClick={() => onOpen(data._id, data.title)}>
                    {data.title}
                </Button>
            </Hint>
            <Separator orientation="vertical" decorative className="bg-neutral-300 h-[28px] mx-1.5 w-0.5" />
            <Actions
                side="bottom"
                sideOffset={10}
                id={data._id}
                title={data.title}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size={"icon"} variant={"board"}>
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div >
    )
}

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
            <Skeleton className="w-full h-full bg-muted" />
        </div>
    )
}
"use client"

import { useSearchParams } from "next/navigation";
import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org"
import { useOrganization } from "@clerk/nextjs"

const DashboardPage = () => {
    const { organization } = useOrganization()
    const searchParams = useSearchParams()

    const search = searchParams.get("search") || undefined;
    const favorites = searchParams.get("favorites") || undefined;

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {
                !organization
                    ? (
                        <EmptyOrg />
                    )
                    :
                    (
                        <BoardList
                            orgId={organization.id}
                            query={{ search, favorites }}
                        />
                    )
            }

        </div>
    )
}

export default DashboardPage
"use client"

import Link from "next/link"
import Image from "next/image"
import { poppins } from "@/app/ui/fonts"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"

export const OrgSidebar = () => {
    const searchParams = useSearchParams()
    const favorites = searchParams.get("favorites")

    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pt-5 pl-5">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        height={32}
                        width={65}
                    />
                    <span className={`font-semibold text-2xl ${poppins.className}`}>
                        Board
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                            color: "black"
                        },
                        organizationPreviewMainIdentifier__organizationSwitcherTrigger: {
                            fontWeight: "bold",
                            fontSize: "16px",
                            lineHeight: "24px"
                        },
                        organizationPreviewAvatarBox: {
                            width: 36,
                            height: 36
                        },
                        organizationPreviewAvatarImage: {
                            width: 36,
                            height: 36,
                        }
                    }
                }}
            />
            <div className="space-y-1 w-full">
                <Button asChild size="lg" variant={favorites ? "ghost" : "secondary"} className="font-normal justify-start px-2 w-full shadow-sm">
                    <Link href="/">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Team boards
                    </Link>
                </Button>
                <Button asChild size="lg" variant={favorites ? "secondary" : "ghost"} className="font-normal justify-start px-2 w-full shadow-sm">
                    <Link href={{ pathname: "/", query: { favorites: true } }}>
                        <Star className="w-4 h-4 mr-2" />
                        Favorite boards
                    </Link>
                </Button>
            </div>
        </div>
    )
}
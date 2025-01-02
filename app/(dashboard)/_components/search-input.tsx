"use client"

import qs from "query-string"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import {
    ChangeEvent,
    useState
} from "react"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"


export const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const helper = e.target.value
        setValue(helper)
        updateSearch(helper)
    }

    const updateSearch = useDebouncedCallback((searchValue: string) => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: searchValue,
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, 500)

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                className="w-full max-w-[516px] pl-9 shadow"
                placeholder="Search boards"
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}
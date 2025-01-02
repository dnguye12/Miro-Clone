import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Image
                src="/empty-favorites.svg"
                width={140}
                height={140}
                alt="Empty"
                className="drop-shadow"
            />
            <h2 className="text-2xl font-semibold mt-6">No favorite boards</h2>
            <p className="text-muted-foreground text-sm mt-2">Try favoring a board first.</p>
        </div>
    )
}
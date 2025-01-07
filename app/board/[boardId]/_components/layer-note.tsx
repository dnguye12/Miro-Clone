import { kalam } from "@/app/ui/fonts";
import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

interface LayerNoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string
}

export const LayerNote = ({ id, layer, onPointerDown, selectionColor }: LayerNoteProps) => {
    const { x, y, width, height, fill, value } = layer

    const calculateFontSize = (width: number, height: number) => {
        const maxFontSize = 96;
        const scaleFactor = 0.15
        const fontSizeBasedOnHeight = height * scaleFactor
        const fontSizeBasedOnWidth = width * scaleFactor

        return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth)
    }

    const updateValue = useMutation((
        { storage },
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers")

        liveLayers.get(id)?.set("value", newValue)
    }, [])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                backgroundColor: fill ? colorToCSS(fill) : "#fff9b1"
            }}
            className="drop-shadow-xl shadow-md"
        >
            <ContentEditable
                html={value || "text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center outline-none",
                    kalam.className
                )}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? getContrastingTextColor(fill) : "#000"
                }}
            />
        </foreignObject>
    )
}
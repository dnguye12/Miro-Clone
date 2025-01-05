import { colorToCSS } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface LayerRectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string
}

export const LayerRectangle = ({ id, layer, onPointerDown, selectionColor }: LayerRectangleProps) => {
    const { x, y, height, width, fill } = layer
    return (
        <rect
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={2}
            fill={fill ? colorToCSS(fill) : "#CCC"}
            stroke={selectionColor || "transparent"}
        />
    )
}
import { colorToCSS } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface LayerEllipseProps {
    id: string;
    layer: EllipseLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string
}

export const LayerEllipse = ({ id, layer, onPointerDown, selectionColor }: LayerEllipseProps) => {
    const { x, y, width, height, fill } = layer
    return (
        <ellipse
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            fill={fill ? colorToCSS(fill) : "#CCC"}
            stroke={selectionColor || "transparent"}
            strokeWidth={2}
        />
    )
}
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { LayerRectangle } from "./layer_rectangle";
import { LayerEllipse } from "./layer_ellipse";
import { LayerText } from "./layer-text";
import { LayerNote } from "./layer-note";
import { LayerPath } from "./layer-path";
import { colorToCSS } from "@/lib/utils";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string
}

export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) {
        return null
    }

    switch (layer.type) {
        case LayerType.Path:
            return (
                <LayerPath
                    key={id}
                    points={layer.points}
                    x={layer.x}
                    y={layer.y}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    fill={colorToCSS(layer.fill)}
                />
            )
        case LayerType.Note:
            return (
                <LayerNote
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return (
                <LayerText
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Ellipse:
            return (
                <LayerEllipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Rectangle:
            return (
                <LayerRectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        default:
            return null
    }
})

LayerPreview.displayName = "LayerPreview"
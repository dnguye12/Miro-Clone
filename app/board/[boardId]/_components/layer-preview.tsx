import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { LayerRectangle } from "./layer_rectangle";

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
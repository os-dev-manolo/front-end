import React, { useCallback } from "react";
import { saveAs } from "file-saver";

import { useOlMap } from "../../../../shared/hooks/useOlMap";
import { RoundedButton } from "../../../global";

import { PrintMapIcon } from "../../../../shared/assets/icons";

export const PrintMap: React.FC = () => {
    const { map } = useOlMap();

    const printMap = useCallback(async () => {
        const mapCanvas = document.createElement("canvas");
        const size = map?.getSize();

        if (size) {
            const [width, height] = size;
            mapCanvas.width = width;
            mapCanvas.height = height;
        }

        mapCanvas.setAttribute("crossorigin", "anonymous");
        const mapContext = mapCanvas.getContext("2d");

        Array.prototype.forEach.call(
            document.querySelectorAll(".ol-layer canvas"),
            (canvas) => {
                if (canvas.width > 0) {
                    canvas.setAttribute("crossorigin", "anonymous");

                    const { opacity } = canvas.parentNode.style;

                    if (mapContext) {
                        mapContext.globalAlpha =
                            opacity === "" ? 1 : Number(opacity);
                        const { transform } = canvas.style;
                        const matrix = transform
                            .match(/^matrix\(([^(]*)\)$/)[1]
                            .split(",")
                            .map(Number);
                        CanvasRenderingContext2D.prototype.setTransform.apply(
                            mapContext,
                            matrix
                        );
                        mapContext.drawImage(canvas, 0, 0);
                    }
                }
            }
        );

        mapCanvas?.toBlob((blob) => {
            if (blob) {
                saveAs(blob, `map-${new Date(Date.now()).toISOString()}.png`);
            }
        });
    }, [map]);

    return (
        <RoundedButton
            onClick={printMap}
            type="button"
            description="IMPRIMIR MAPA"
        >
            <img
                src={PrintMapIcon}
                className="h-7 w-7 md:h-10 md:w-10"
                alt="IMPRIMIR MAPA"
            />
        </RoundedButton>
    );
};

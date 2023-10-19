import React, { ChangeEvent } from "react";
import { ILayersStyles } from "../../../../../shared/interfaces/ILayers";

interface LayersStylesProps {
    layerName: string;
    styles: ILayersStyles[];
    doAfterSelectStyle(geoserverName: string): void;
    visible: boolean;
}

export const LayersStyles: React.FC<LayersStylesProps> = ({
    layerName,
    doAfterSelectStyle,
    styles,
    visible,
}) => {
    const handleSelectStyle = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.checked) return;

        doAfterSelectStyle(event.currentTarget.value);
    };

    return (
        <div
            className={`z-10 absolute ${
                visible ? "block" : "hidden"
            } w-48 divide-y divide-gray-100 bg-white rounded-lg shadow`}
        >
            <div className="px-4 py-2 text-sm text-slate-900 font-medium">
                <div>Estilos</div>
            </div>
            <ul className="p-2 text-sm m-0">
                {(styles || []).map((style) => (
                    <li>
                        <div className="flex items-center">
                            <input
                                id={style.cames_nome_geoserver}
                                name={`${layerName}-${style}`}
                                value={style.cames_nome_geoserver}
                                type="radio"
                                onChange={handleSelectStyle}
                            />
                            <label
                                className="ml-2 p-0 text-slate-900"
                                htmlFor={style.cames_nome_geoserver}
                            >
                                {style.cames_nome}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

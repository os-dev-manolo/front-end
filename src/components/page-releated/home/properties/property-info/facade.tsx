import React, { useState } from "react";

import { FaImages, FaListUl } from "react-icons/fa";

import { FileList, Tooltip } from "../../../../global";
import { FileListProps } from "../../../../global/file-list";

interface FacadeProps {
    files?: string[];
}

export const Facade: React.FC<FacadeProps> = ({ files }) => {
    const [viewType, setViewType] =
        useState<FileListProps["viewType"]>("images");

    const toggleViewType = () => {
        setViewType(viewType === "images" ? "list" : "images");
    };

    if (!files || !files.length)
        return <h4>Nenhuma foto de fachada encontrada</h4>;

    return (
        <>
            <h4>Fotos de fachada</h4>

            <div className="flex flex-1">
                <Tooltip
                    text={`Mudar visualização para ${
                        viewType === "images" ? "lista" : "imagens"
                    }`}
                >
                    <button
                        type="button"
                        onClick={toggleViewType}
                        className="text-teal-700 mr-4"
                    >
                        {viewType === "images" ? (
                            <FaListUl size={20} />
                        ) : (
                            <FaImages size={20} />
                        )}
                    </button>
                </Tooltip>
                <FileList files={files} viewType={viewType} />
            </div>
        </>
    );
};

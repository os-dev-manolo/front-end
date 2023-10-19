import React, { useState } from "react";

import { FaImages, FaListUl } from "react-icons/fa";

import { FileList, Tooltip } from "../../../../global";
import { FileListProps } from "../../../../global/file-list";

interface FilesProps {
    files?: string[];
}

export const Files: React.FC<FilesProps> = ({ files }) => {
    const [viewType, setViewType] =
        useState<FileListProps["viewType"]>("images");

    const toggleViewType = () => {
        setViewType(viewType === "images" ? "list" : "images");
    };

    if (!files || !files.length) return <h4>Nenhum anexo encontrado</h4>;

    return (
        <>
            <h4>Anexos</h4>

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

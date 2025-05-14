import React, { useCallback, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
    GrDocumentCsv,
    GrDocumentExcel,
    GrDocumentWord,
    GrDocumentPdf,
    GrDocument,
} from "react-icons/gr";
import { updateArray } from "../../../shared/utils/arrays.utils";

export interface FileListProps {
    files: string[];
    viewType?: "list" | "images";
    canRemove?: boolean;
    title?: string;
    doAfterRemoveFromList?(files: string[]): void;
}

export const FileList: React.FC<FileListProps> = ({
    files,
    viewType = "list",
    canRemove = false,
    doAfterRemoveFromList,
    title,
}) => {
    const [_files, setFiles] = useState<string[]>([]);
    const [imageToShow, setImageToShow] = useState<string>();

    const handleRemoveFileFromList = (file: string) => {
        const newFiles = updateArray(file, files);

        setFiles(newFiles);

        if (doAfterRemoveFromList) doAfterRemoveFromList(newFiles);
    };

    const showImage = (fileUrl: string) => {
        setImageToShow(fileUrl);
    };

    const hideImages = () => {
        setImageToShow(undefined);
    };

    const renderFile = useCallback((fileUrl: string) => {
        const fileExtension = fileUrl.split("/").pop()?.split(".").pop();

        switch (fileExtension) {
            case "jpeg":
            case "pjpeg":
            case "jpg":
            case "png":
                return (
                    <img src={fileUrl} alt="anexo" className="w-auto h-auto" />
                );
            case "csv":
                return <GrDocumentCsv color="#089706" size={32} />;
            case "xls":
            case "xlsx":
                return <GrDocumentExcel color="#089706" size={32} />;
            case "doc":
            case "docx":
                return <GrDocumentWord color="#55AAFF" size={32} />;

            case "pdf":
                return <GrDocumentPdf color="#fa1d1d" size={32} />;

            default:
                return <GrDocument size={32} />;
        }
    }, []);

    useEffect(() => {
        setFiles(files);
    }, [files]);

    if (viewType === "list") {
        return (
            <div>
                {title && <h5>{title}</h5>}
                <ul className="relative">
                    {_files.map((file) => (
                        <li key="file" onMouseLeave={hideImages}>
                            {canRemove && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveFileFromList(file)
                                    }
                                    className="mr-2"
                                >
                                    <FaTrashAlt color="tomato" />
                                </button>
                            )}
                            <a
                                href={file}
                                target="_blank"
                                rel="noreferrer"
                                onMouseOver={() => showImage(file)}
                                onFocus={hideImages}
                            >
                                {file.split("/").pop()}
                            </a>

                            <div
                                className={`${imageToShow !== file && "hidden"}
                                absolute bg-white z-2
                                rounded-lg w-32 h-32 p-10 ml-auto shadow-xl
                                inset-0 flex justify-center items-center`}
                            >
                                {renderFile(file)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-1" onMouseLeave={hideImages}>
            {files.map((file) => (
                <div
                    className="flex justify-center items-center flex-column relative"
                    onMouseOver={() => showImage(file)}
                    onFocus={hideImages}
                    key={file}
                >
                    <a href={file} target="_blank" rel="noreferrer" key={file}>
                        <div className="rounded-lg w-32 h-32 shadow-xl p-2 flex justify-center items-center border">
                            {renderFile(file)}
                        </div>
                        {canRemove && (
                            <button
                                type="button"
                                onClick={() => handleRemoveFileFromList(file)}
                                className="mt-2"
                            >
                                <FaTrashAlt color="tomato" />
                            </button>
                        )}
                        <div
                            className={`${imageToShow !== file && "hidden"}
                                absolute bg-white/50 z-2
                                rounded-lg w-32 h-32 shadow-xl
                                inset-0 flex justify-center items-center`}
                        >
                            <p className="text-xs text-center break-all text-black font-bold">
                                {file.split("/").pop()}
                            </p>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

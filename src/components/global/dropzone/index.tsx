/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "@unform/core";

interface Props {
    name: string;
}
interface InputRefProps extends HTMLInputElement {
    acceptedFiles: File[];
}
const Dropzone: React.FC<Props> = ({ name }) => {
    const inputRef = useRef<InputRefProps>(null);
    const { fieldName, registerField, defaultValue = [] } = useField(name);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>(defaultValue);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (onDropAcceptedFiles) => {
            if (inputRef.current) {
                const files = inputRef.current.acceptedFiles
                    ? [
                          ...inputRef.current.acceptedFiles,
                          ...onDropAcceptedFiles,
                      ]
                    : onDropAcceptedFiles;

                inputRef.current.acceptedFiles = files;
                setAcceptedFiles(files);
            }
        },
    });
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: InputRefProps) => {
                return ref.acceptedFiles || [];
            },
            clearValue: (ref: InputRefProps) => {
                ref.acceptedFiles = [];
                setAcceptedFiles([]);
            },
            setValue: (ref: InputRefProps, value) => {
                ref.acceptedFiles = value;
                setAcceptedFiles(value);
            },
        });
    }, [fieldName, registerField]);
    return (
        <div
            {...getRootProps()}
            onClick={() => inputRef.current?.click()}
            className="flex justify-center items-center w-full"
        >
            <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    {acceptedFiles && acceptedFiles.length !== 0 && (
                        <ul>
                            {acceptedFiles.map((file) => (
                                <li key={file.name}>{file.name}</li>
                            ))}
                        </ul>
                    )}
                    <svg
                        aria-hidden="true"
                        className="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                            Arraste ou clique para selecionar os arquivos
                        </span>
                    </p>
                </div>
                <input {...getInputProps()} ref={inputRef} />
            </label>
        </div>
    );
};

export { Dropzone };

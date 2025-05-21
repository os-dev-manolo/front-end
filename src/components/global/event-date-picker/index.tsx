import React, { useRef, useState, useEffect } from "react";
import ReactDatePicker, {
    ReactDatePickerProps,
    registerLocale,
} from "react-datepicker";
import { useField } from "@unform/core";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("ptBR", ptBR);

interface Props extends Omit<ReactDatePickerProps, "onChange"> {
    name: string;
    label?: string;
}

const DatePickerContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10">
                <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-700 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {children}
        </div>
    );
};

export function SingleDatePicker({ name, label, ...rest }: Props) {
    const datepickerInitRef = useRef(null);

    const { fieldName, registerField, defaultValue } = useField(name);

    const [startAt, setStartAt] = useState(defaultValue || null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: datepickerInitRef.current,

            clearValue: (ref) => {
                ref.init.clear();
            },
            getValue: () => {
                return {
                    startAt: startAt
                        ? new Date(startAt).toISOString()
                        : undefined,
                };
            },
        });
    }, [fieldName, registerField, startAt]);

    return (
        <div className="flex flex-col relative justify-center">
            {label && (
                <div className="absolute text-sm text-purple-800 z-10 -top-3.5">
                    {label}
                </div>
            )}
            <div className="">
                <DatePickerContainer>
                    <ReactDatePicker
                        name="date"
                        locale={ptBR}
                        ref={datepickerInitRef}
                        selected={startAt}
                        placeholderText="Data"
                        className="border rounded-lg border-purple-900 text-gray-900 sm:text-sm focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5"
                        onChange={setStartAt}
                        showTimeSelect
                        dateFormat="d MMMM yyyy - h:mm aa"
                        timeCaption="Hora"
                        {...rest}
                    />
                </DatePickerContainer>
            </div>
        </div>
    );
}

import React, { useRef, useState, useEffect } from "react";
import ReactDatePicker, {
    ReactDatePickerProps,
    registerLocale,
} from "react-datepicker";
import { useField } from "@unform/core";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";

registerLocale("pt", pt);

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
                    className="w-5 h-5 text-teal-700 "
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

export function DatePicker({ name, label, ...rest }: Props) {
    const datepickerInitRef = useRef(null);
    const datepickerEndRef = useRef(null);

    const { fieldName, registerField, defaultValue } = useField(name);

    const [startAt, setStartAt] = useState(defaultValue || null);
    const [endAt, setEndAt] = useState(defaultValue || null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: {
                init: datepickerInitRef.current,
                end: datepickerEndRef.current,
            },
            clearValue: (ref) => {
                ref.init.clear();
                ref.end.clear();
            },
            getValue: () => {
                return {
                    startAt: startAt
                        ? new Date(startAt).toISOString()
                        : undefined,
                    endAt: endAt ? new Date(endAt).toISOString() : undefined,
                };
            },
        });
    }, [fieldName, registerField, startAt, endAt]);
    return (
        <div className="flex flex-col relative justify-center">
            {label && (
                <div className="absolute text-sm text-teal-800 z-10 -top-2.5">
                    {label}
                </div>
            )}
            <div className="flex items-center">
                <DatePickerContainer>
                    <ReactDatePicker
                        locale={pt}
                        ref={datepickerInitRef}
                        maxDate={endAt}
                        selected={startAt}
                        placeholderText="Data inicial"
                        className="border rounded-lg border-teal-900 text-gray-900 sm:text-sm  focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2.5"
                        onChange={setStartAt}
                        {...rest}
                    />
                </DatePickerContainer>
                <span className="mx-0.5 text-gray-500">~</span>
                <DatePickerContainer>
                    <ReactDatePicker
                        locale="pt"
                        ref={datepickerEndRef}
                        minDate={startAt}
                        selected={endAt}
                        placeholderText="Data final"
                        className="border rounded-lg border-teal-900 text-gray-900 sm:text-sm  focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2.5"
                        onChange={setEndAt}
                        {...rest}
                    />
                </DatePickerContainer>
            </div>
        </div>
    );
}

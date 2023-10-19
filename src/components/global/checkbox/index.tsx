/* eslint-disable no-param-reassign */
import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useCallback,
    ChangeEvent,
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";

import { Container, MessageError } from "./styles";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    name,
    icon: Icon,
    label,
    ...rest
}) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    const { fieldName, registerField, error, clearError } = useField(name);

    const onFocus = useCallback(() => {
        clearError();
    }, [clearError]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!checkboxRef.current) return;

        checkboxRef.current.value = event.target.checked ? "true" : "false";

        if (rest.onChange) rest.onChange(event);
    };

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: checkboxRef.current,
            getValue: (ref: HTMLInputElement) =>
                ref.value === "true" ? "true" : "false",
            setValue: (ref: HTMLInputElement, value?: "false" | "true") => {
                ref.value = value || "false";
                ref.checked = value === "true";
            },
            clearValue: (ref: HTMLInputElement) => {
                ref.value = "false";
                ref.checked = false;
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container
            style={{
                display: `${rest.hidden ? "none" : "flex"}`,
            }}
        >
            {error ? (
                <MessageError>{error}</MessageError>
            ) : (
                <p className="m-0">{label}</p>
            )}
            {Icon && <Icon size={20} color={error && "red"} />}

            <input
                id={fieldName}
                type="checkbox"
                ref={checkboxRef}
                {...rest}
                onChange={onChange}
                onFocus={onFocus}
            />
        </Container>
    );
};

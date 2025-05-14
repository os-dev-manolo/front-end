/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";

import ReactInputMask, { Props as MaskProps } from "react-input-mask";

import { MessageError } from "./styles";
import {
    ContainerScrollable,
    LabelScrollableContainer,
} from "./styles-scrollable";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const ScrollableInput: React.FC<InputProps> = ({
    name,
    icon: Icon,
    label,
    ...rest
}) => {
    const inputRef = useRef(null);

    const { fieldName, registerField, error, clearError } = useField(name);

    const onFocus = useCallback(() => {
        clearError();
    }, [clearError]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);

    return (
        <ContainerScrollable
            style={{
                display: `${rest.hidden ? "none" : "flex"}`,
            }}
        >
            {(label || error) && (
                <LabelScrollableContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-teal-800">{label}</p>
                    )}
                </LabelScrollableContainer>
            )}
            <div className="input-outline">
                <input ref={inputRef} {...rest} onFocus={onFocus} />
                <span className="border" />
            </div>
        </ContainerScrollable>
    );
};

export interface MaskInputProps extends MaskProps {
    name: string;
    label?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const InputMask: React.FC<MaskInputProps> = ({
    name,
    icon: Icon,
    label,
    ...rest
}) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, clearError, error } =
        useField(name);

    const onFocus = useCallback(() => {
        clearError();
    }, [clearError]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
            setValue(ref: any, value: string) {
                ref.setInputValue(value);
            },
            clearValue(ref: any) {
                ref.setInputValue("");
            },
        });
    }, [fieldName, registerField]);

    return (
        <ContainerScrollable
            style={{
                display: `${rest.hidden ? "none" : null}`,
            }}
        >
            {(label || error) && (
                <LabelScrollableContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-teal-800">{label}</p>
                    )}
                </LabelScrollableContainer>
            )}
            <div className="input-outline">
                <ReactInputMask
                    ref={inputRef}
                    defaultValue={defaultValue}
                    onFocus={onFocus}
                    {...rest}
                />
                <span className="border" />
            </div>
        </ContainerScrollable>
    );
};

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

import {
    Container,
    MessageError,
    LabelContainer,
    LabelContainerTextArea,
    ContainerTextArea,
} from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    icon?: React.ComponentType<IconBaseProps>;
}
export interface TextAreaProps
    extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const Input: React.FC<InputProps & { readOnlyMode?: boolean }> = ({
    name,
    icon: Icon,
    label,
    readOnlyMode = false,
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
        <Container
            style={{
                display: `${rest.hidden ? "none" : "flex"}`,
            }}
        >
            {(label || error) && (
                <LabelContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-purple-800">{label}</p>
                    )}
                </LabelContainer>
            )}
            {Icon && <Icon size={20} color={error && "red"} />}

            <input
                ref={inputRef}
                {...rest}
                onFocus={onFocus}
                readOnly={readOnlyMode}
                disabled={readOnlyMode}
            />
        </Container>
    );
};

export const InputMultiLined: React.FC<
    TextAreaProps & { readOnlyMode?: boolean }
> = ({ name, icon: Icon, label, readOnlyMode = false, ...rest }) => {
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
        <ContainerTextArea
            style={{
                display: `${rest.hidden ? "none" : "flex"}`,
            }}
        >
            {(label || error) && (
                <LabelContainerTextArea>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-purple-800">{label}</p>
                    )}
                </LabelContainerTextArea>
            )}
            {Icon && <Icon size={20} color={error && "red"} />}

            <textarea
                ref={inputRef}
                {...rest}
                onFocus={onFocus}
                readOnly={readOnlyMode}
                disabled={readOnlyMode}
            />
        </ContainerTextArea>
    );
};

export interface MaskInputProps extends MaskProps {
    name: string;
    label?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const InputMask: React.FC<
    MaskInputProps & { readOnlyMode?: boolean }
> = ({ name, icon: Icon, label, readOnlyMode = false, ...rest }) => {
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
        <Container
            style={{
                display: `${rest.hidden ? "none" : null}`,
            }}
        >
            {(label || error) && (
                <LabelContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p>{label}</p>
                    )}
                </LabelContainer>
            )}
            {Icon && <Icon size={20} color={error && "red"} />}

            <ReactInputMask
                ref={inputRef}
                defaultValue={defaultValue}
                onFocus={onFocus}
                readOnly={readOnlyMode}
                disabled={readOnlyMode}
                {...rest}
            />
        </Container>
    );
};

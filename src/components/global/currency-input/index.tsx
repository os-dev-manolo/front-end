import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useField } from "@unform/core";
import { Container, LabelContainer, MessageError } from "./styles";

export interface CurrencyInputProps {
    name: string;
    label?: string;
}

export function CurrencyInput({ name, label, ...rest }: CurrencyInputProps) {
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState<number | string>();

    const { fieldName, registerField, error, clearError } = useField(name);

    const onFocus = () => {
        clearError();
    };

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue() {
                return inputValue;
            },
            setValue(_, value) {
                setInputValue(value);
            },
            clearValue() {
                setInputValue(undefined);
            },
        });
    }, [fieldName, registerField, inputValue]);

    return (
        <Container>
            {(label || error) && (
                <LabelContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-teal-800">{label}</p>
                    )}
                </LabelContainer>
            )}
            <NumericFormat
                getInputRef={inputRef}
                decimalScale={2}
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$"
                name={name}
                value={inputValue}
                onValueChange={({ floatValue }) => setInputValue(floatValue)}
                onFocus={onFocus}
                {...rest}
            />
        </Container>
    );
}

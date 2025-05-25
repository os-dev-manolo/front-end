/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useField } from "@unform/core";

import { IconBaseProps } from "react-icons";
import { Container, MessageError, LabelContainer } from "./styles";

interface InputCurrency extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    // opcional: ícone, se quiser manter seu padrão original
    icon?: React.ComponentType<IconBaseProps>;
}

export const InputCurrency: React.FC<InputCurrency> = ({
    name,
    label,
    icon: Icon,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        fieldName,
        registerField,
        defaultValue = "",
        error,
        clearError,
    } = useField(name);
    const [value, setValue] = useState(defaultValue);

    const onFocus = useCallback(() => {
        clearError();
    }, [clearError]);

    // Função que converte "1.000,50" → 1000.5 (number)
    function parseBRLToNumber(val: string): number {
        if (!val) return 0;
        const normalized = val.replace(/\./g, "").replace(",", ".");
        return parseFloat(normalized);
    }

    // Função que formata número para string BRL "1000.5" → "1.000,50"
    function formatNumberToBRL(val: number): string {
        if (Number.isNaN(val)) return "";
        return val.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
            getValue: (ref: HTMLInputElement) => parseBRLToNumber(ref.value),
            setValue: (ref: HTMLInputElement, val: number) => {
                ref.value = formatNumberToBRL(val);
                setValue(ref.value);
            },
            clearValue: (ref: HTMLInputElement) => {
                ref.value = "";
                setValue("");
            },
        } as any); // <<<<<<<< <<< forçando como any para evitar erro de tipagem
    }, [fieldName, registerField]);

    return (
        <Container style={{ display: `${rest.hidden ? "none" : "flex"}` }}>
            {(label || error) && (
                <LabelContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-purple-800">{label}</p>
                    )}
                </LabelContainer>
            )}
            {Icon && <Icon size={20} color={error ? "red" : undefined} />}

            <input
                {...rest}
                name={name}
                ref={inputRef}
                value={value}
                onFocus={onFocus}
                onChange={(e) => setValue(e.target.value)}
            />
        </Container>
    );
};

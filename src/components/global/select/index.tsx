import { useField } from "@unform/core";
import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactSelect, { Props as SelectProps } from "react-select";
import { IconBaseProps } from "react-icons";

import { MessageError } from "../input/styles";
import { Container, IconContainer, LabelContainer } from "./styles";

interface IDefaultOptions {
    value: string;
    label: string;
}
interface Props extends SelectProps<unknown> {
    name: string;
    initValue?: IDefaultOptions;
    label?: string;
    width?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export const Select: React.FC<Props> = ({
    name,
    initValue,
    label,
    icon: Icon,
    width,
    ...rest
}) => {
    const selectRef = useRef(null);
    const [value, setValue] = useState<IDefaultOptions>();

    const handleChangeValue = useCallback((data: IDefaultOptions) => {
        setValue(data);
    }, []);

    useEffect(() => {
        setValue(initValue);
    }, [initValue]);

    const { fieldName, defaultValue, registerField, error, clearError } =
        useField(name);

    useEffect(() => {
        if (rest.options) {
            registerField({
                name: fieldName,
                ref: selectRef.current,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getValue: (ref: any) => {
                    if (ref.state.selectValue[0] === undefined) {
                        return "";
                    }
                    return ref.state.selectValue[0].value;
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setValue(ref: any, value_: any) {
                    const selec = rest.options?.find((option) => {
                        let v = value_;

                        if (typeof v === "boolean") {
                            v = v ? "true" : "false";
                        }

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return (option as any).value === v;
                    });

                    if (selec) ref.selectOption(selec);
                },
                clearValue: (ref) => {
                    ref.select.clearValue();
                },
            });
        }
    }, [fieldName, registerField, rest.options]);

    const onFocus = () => {
        clearError();
    };

    return (
        <Container>
            {Icon && (
                <IconContainer>
                    <Icon size={20} color={error && "red"} />
                </IconContainer>
            )}

            {(label || error) && (
                <LabelContainer>
                    {error ? (
                        <MessageError>{error}</MessageError>
                    ) : (
                        <p className="text-sm text-teal-800">{label}</p>
                    )}
                </LabelContainer>
            )}

            <ReactSelect
                defaultValue={defaultValue}
                value={value}
                onChange={handleChangeValue}
                onFocus={onFocus}
                ref={selectRef}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        border: "1px solid #234e52",
                        boxShadow: "0 !important",
                        "&:hover": {
                            border: "1px solid #234e52 !important",
                        },
                        borderRadius: "6px",
                        outline: "none",
                        ":focus-within": {
                            outline: "none",
                        },
                    }),
                    container: (base) => ({
                        ...base,
                        width: width || "100%",
                        minWidth: "100%",
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 50,
                    }),
                }}
                {...rest}
            />
        </Container>
    );
};

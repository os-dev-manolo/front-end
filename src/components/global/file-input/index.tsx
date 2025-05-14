/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
    ChangeEvent,
    useRef,
    useEffect,
    useCallback,
    useState,
} from "react";
import { useField } from "@unform/core";
import { Container, InputBlock } from "./styles";

interface Props {
    name: string;
}
type InputProps = JSX.IntrinsicElements["input"] & Props;
export function FileInput({ name, ...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, registerField, defaultValue } = useField(name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [preview, setPreview] = useState(defaultValue);
    const [previewDescription, setPreviewDescription] = useState("");
    const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setPreview(null);
            return;
        }
        setPreviewDescription(file.name);
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
    }, []);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "files[0]",
            clearValue(ref: HTMLInputElement) {
                // eslint-disable-next-line no-param-reassign
                ref.value = "";
                setPreview(null);
            },
            setValue(_: HTMLInputElement, value: string) {
                setPreview(value);
            },
        });
    }, [fieldName, registerField]);
    return (
        <Container>
            <InputBlock>
                <label>
                    Escolha um arquivo
                    <input
                        type="file"
                        ref={inputRef}
                        onChange={handlePreview}
                        {...rest}
                    />
                </label>
            </InputBlock>
            {/* {preview && (
                <img src={preview} alt="Preview" width="80" height="45" />
            )} */}
            <span>{previewDescription}</span>
        </Container>
    );
}

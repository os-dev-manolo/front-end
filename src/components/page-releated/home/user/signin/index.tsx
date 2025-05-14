import React, { useCallback, useState } from "react";
import { RoundedButton, Modal, SecundaryButton } from "../../../../global";
import { SigninIcon } from "../../../../../shared/assets/icons";
import { Form } from "./form";

export const SigninButton: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);

    const [formType, setFormType] = useState<"signin" | "forgotPassword">(
        "signin"
    );

    const toggleFormType = useCallback(() => {
        setFormType(formType === "signin" ? "forgotPassword" : "signin");
    }, [formType]);

    const toggleModalState = () => {
        setShow(!show);
    };

    return (
        <>
            <Modal show={show} handleCloseModal={toggleModalState} size="lg">
                <div className="flex justify-center items-center">
                    <div className="md:w-2/4">
                        <Form
                            type={formType}
                            doAfterSendPassword={toggleFormType}
                        />
                        <div className="mt-3 h-10">
                            <SecundaryButton
                                type="button"
                                onClick={toggleFormType}
                            >
                                {formType === "signin"
                                    ? "ESQUECI A SENHA"
                                    : "VOLTAR"}
                            </SecundaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
            <RoundedButton
                onClick={toggleModalState}
                description="AUTENTICAR"
                tooltipPosition="left"
            >
                <img
                    src={SigninIcon}
                    className="h-7 w-7 md:h-10 md:w-10"
                    alt="autenticar"
                />
            </RoundedButton>
        </>
    );
};

import React, { useState } from "react";

import { RoundedButton, Modal } from "../../../../global";

import { EditIcon } from "../../../../../shared/assets/icons";
import { Form } from "./form";

export const UpdatePasswordButton: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModalState = () => {
        setShowModal(!showModal);
    };
    return (
        <>
            <Modal
                show={showModal}
                handleCloseModal={toggleModalState}
                size="lg"
            >
                <div className="flex justify-center items-center">
                    <div className="w-full md:w-2/4">
                        <h5 className="text-teal-900 text-center">
                            ALTERAR SENHA
                        </h5>
                        <Form doAfterReset={toggleModalState} />
                    </div>
                </div>
            </Modal>
            <RoundedButton
                description="ATUALIZAR SENHA"
                onClick={toggleModalState}
                tooltipPosition="left"
            >
                <img
                    src={EditIcon}
                    className="h-7 w-7 md:h-10 md:w-10"
                    alt="atualizar senha"
                />
            </RoundedButton>
        </>
    );
};

import React, { useState } from "react";
import { SignupForm } from "./signup-form";

import { SignupIcon } from "../../../../../shared/assets/icons";
import { Modal, RoundedButton } from "../../../../global";

export const SignupButton: React.FC = () => {
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
                <SignupForm doAfterSignup={toggleModalState} />
            </Modal>
            <RoundedButton
                onClick={toggleModalState}
                description="CADASTRAR"
                tooltipPosition="left"
            >
                <img
                    src={SignupIcon}
                    alt="registrar"
                    className="h-7 w-7 md:h-10 md:w-10"
                />
            </RoundedButton>
        </>
    );
};

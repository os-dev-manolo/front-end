import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

import {
    Modal as BootstrapModal,
    ModalProps as BootstrapModalProps,
} from "react-bootstrap";

interface ModalProps extends BootstrapModalProps {
    title?: string;
    children?: React.ReactNode;
    show: boolean;
    handleCloseModal(): void;
    footer?: React.ReactNode;
}

export interface ModalHandles {
    open(): void;
    close(): void;
}

const Modal = forwardRef<ModalHandles, ModalProps>(
    ({ title, children, show, handleCloseModal, footer, ...rest }, ref) => {
        const [shouldShow, setShouldShow] = useState<boolean>(false);

        useEffect(() => {
            setShouldShow(show);
        }, [show]);

        useImperativeHandle(ref, () => ({
            open: () => setShouldShow(true),
            close: () => setShouldShow(false),
        }));

        const handleClose = () => {
            setShouldShow(false);
            if (handleCloseModal) handleCloseModal();
        };

        return (
            <BootstrapModal
                show={shouldShow}
                onHide={handleClose}
                handleCloseModal={handleClose}
                dialogClassName="modal-90w"
                {...rest}
            >
                <BootstrapModal.Header closeButton>
                    {title && (
                        <BootstrapModal.Title>{title}</BootstrapModal.Title>
                    )}
                </BootstrapModal.Header>
                <BootstrapModal.Body>{children}</BootstrapModal.Body>
                {footer && (
                    <BootstrapModal.Footer>{footer}</BootstrapModal.Footer>
                )}
            </BootstrapModal>
        );
    }
);

Modal.displayName = "Modal";

export { Modal };

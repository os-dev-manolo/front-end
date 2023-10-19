import React, { forwardRef, useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles, Scope } from "@unform/core";
import { Modal, ModalHandles } from "../../../../components/global/modal";
import { FileInput } from "../../../../components/global";

import {
    Number,
    Street,
    Zipcode,
    Cnpj,
    Description,
    Ressource,
    Trackers,
    Secretary,
    Value,
    Work,
    CounterpartValue,
} from "./inputs";
import { useProjects } from "../../../../shared/hooks/providers/useProjects";
import { yupValidation } from "../../../../shared/utils/yup";
import { ApiErrorHandler } from "../../../../shared/utils/errors.utils";
import { IRegisterProjectForm } from "../interfaces/register-project-form.interface";
import { showToast } from "../../../../components/global/toast";
import RegisterProjectAttachments, {
    pickProfileBasedOnTracker,
} from "./register-project-attachments";

const RegisterProjectModal = forwardRef<ModalHandles>((props, ref) => {
    const formRef = useRef<FormHandles>(null);
    const { createProject } = useProjects();

    const [selectedTracker, setSelectedTracker] = useState<number>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ({
        descriptionFile,
        attachments,
        ...form
    }: IRegisterProjectForm) => {
        setLoading(true);
        try {
            // pega a label de cada input de anexo e adiciona como descrição do arquivo
            const profile = selectedTracker
                ? pickProfileBasedOnTracker(selectedTracker)
                : {};
            const formatedAttachments = attachments
                ? Object.entries(attachments)
                      .filter(([, value]) => !!value)
                      .map(([key, value]) => ({
                          description: profile[key],
                          attachment: value as File,
                      }))
                : [];

            if (descriptionFile) {
                formatedAttachments.push({
                    attachment: descriptionFile,
                    description: "Anexo da descrição",
                });
            }

            await createProject({
                ...form,
                attachments: formatedAttachments,
            });

            showToast({
                type: "success",
                message: "Solicitação de projeto criada com sucesso",
            });

            window.location.reload();
        } catch (err) {
            ApiErrorHandler(err);

            const validationErrors = yupValidation(err);

            formRef.current?.setErrors(validationErrors);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal ref={ref} title="Cadastro de projeto" size="xl">
            <Form onSubmit={handleSubmit} ref={formRef}>
                <div className="grid gap-y-2 grid-cols-5">
                    <div className="col-span-3">
                        <Trackers
                            onChange={(value) => setSelectedTracker(value)}
                        />
                    </div>

                    <div className="col-span-2" />
                    <div className="col-span-3">
                        <Work />
                        <span className="text-xs text-slate-600 ml-2">
                            *Nome oficial e completo da edificação.
                        </span>
                    </div>

                    <div className="col-span-2" />

                    <div className="col-span-3">
                        <Street />
                    </div>

                    <div className="col-span-2">
                        <Number />
                    </div>

                    <div className="col-span-2">
                        <Zipcode />
                    </div>

                    <div className="col-span-3" />

                    <div className="col-span-3">
                        <Secretary />
                        <span className="text-xs text-slate-600 ml-2">
                            *Nome completo da secretaria responsável.
                        </span>
                    </div>

                    <div className="col-span-2">
                        <Cnpj />
                        <span className="text-xs text-slate-600 ml-2">
                            *CNPJ do tomador.
                        </span>
                    </div>

                    <div className="col-span-3">
                        <Ressource />
                        <span className="text-xs text-slate-600 ml-2">
                            *Fonte de recurso prórpria ou convênio, se houver
                            contrapartida, favor mencionar a divisão dos
                            recursos.
                        </span>
                    </div>

                    <div className="col-span-2">
                        <Value />
                        <CounterpartValue />
                    </div>
                    <div className="col-span-3">
                        <Description />
                        <span className="text-xs text-slate-600 ml-2">
                            *Descrever o que se pretende fazer, com todas as
                            informações pertinentes.
                        </span>
                    </div>

                    <div className="col-span-2">
                        <FileInput name="descriptionFile" />
                    </div>

                    {!!selectedTracker && (
                        <Scope path="attachments">
                            <RegisterProjectAttachments
                                trackerId={selectedTracker}
                            />
                        </Scope>
                    )}
                </div>
                <div className="flex justify-between">
                    <div />
                    <button
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        Salvar
                    </button>
                </div>
            </Form>
        </Modal>
    );
});

RegisterProjectModal.displayName = "RegisterProjectModal";

export default RegisterProjectModal;

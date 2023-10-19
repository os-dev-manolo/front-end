import React, { forwardRef, useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Modal, ModalHandles } from "../../../../components/global/modal";

import {
    Number,
    Street,
    Zipcode,
    Cnpj,
    Description,
    Ressource,
    Secretary,
    Value,
    Work,
    CounterpartValue,
} from "./inputs";
import { useProjects } from "../../../../shared/hooks/providers/useProjects";
import { yupValidation } from "../../../../shared/utils/yup";
import { ApiErrorHandler } from "../../../../shared/utils/errors.utils";
import { showToast } from "../../../../components/global/toast";
import { IUpdateProjectForm } from "../interfaces/update-project-form.interface";
import Project from "../../../../shared/providers/projects/entities/project.entity";

interface UpdateProjectProps {
    project?: Project;
}

const UpdateProjectModal = forwardRef<ModalHandles, UpdateProjectProps>(
    ({ project }, ref) => {
        const formRef = useRef<FormHandles>(null);
        const { updateProject } = useProjects();

        const [loading, setLoading] = useState(false);

        const handleSubmit = async (form: IUpdateProjectForm) => {
            setLoading(true);
            try {
                await updateProject(project?.id as number, form);

                showToast({
                    type: "success",
                    message: "Solicitação de projeto atualizada com sucesso",
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

        const setFormData = () => {
            if (project) {
                formRef.current?.setData({
                    work: project.work,
                    secretary: project.secretary,
                    cnpj: project.cnpj,
                    ressource: project.ressource,
                    value: project.value,
                    description: project.description,
                    street: project.address?.street,
                    number: project.address?.number,
                    zipcode: project.address?.zipcode || "",
                    counterpartValue: project.counterpartValue,
                });
            }
        };

        return (
            <Modal
                ref={ref}
                title="Cadastro de projeto"
                size="xl"
                onShow={setFormData}
            >
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <div className="grid gap-y-2 grid-cols-5">
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
                                *Fonte de recurso prórpria ou convênio, se
                                houver contrapartida, favor mencionar a divisão
                                dis recursos.
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
                    </div>
                    <div className="col-start-4 mt-4 w-40">
                        <button
                            className="btn-primary"
                            type="submit"
                            disabled={loading}
                        >
                            Atualizar
                        </button>
                    </div>
                </Form>
            </Modal>
        );
    }
);

UpdateProjectModal.displayName = "UpdateProjectModal";

export default UpdateProjectModal;

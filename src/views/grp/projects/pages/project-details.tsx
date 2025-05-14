import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { AiOutlineEdit } from "react-icons/ai";

import {
    Card,
    LinearProgressBar,
    LocalLoading,
} from "../../../../components/global";
import { useProjects } from "../../../../shared/hooks/providers/useProjects";
import Project from "../../../../shared/providers/projects/entities/project.entity";
import Masks from "../../../../shared/utils/mask.utils";
import { ProjectIssuesTable } from "../components/project-issues-table";
import { historyActionLabel, historyNameLabel } from "../utils/project.utils";
import UpdateProjectModal from "../components/update-project-modal";
import { ModalHandles } from "../../../../components/global/modal";

export default function ProjectDetail() {
    const editProjectRef = useRef<ModalHandles>(null);

    const { id } = useParams();
    const { getProject } = useProjects();

    const [project, setProject] = useState<Project>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const projectDetails = await getProject(Number(id));

                setProject(projectDetails);
            } finally {
                setLoading(false);
            }
        };

        if (id && !project) fetchProject();
    }, [id, project, getProject]);

    if (loading) return <LocalLoading />;

    return (
        <>
            <div className="grid gap-2 grid-cols-5 m-4">
                <div className="col-span-2">
                    <Card
                        title={project?.work}
                        titleRight={
                            <div className="w-40">
                                <LinearProgressBar
                                    progress={project?.doneRatio || 0}
                                />
                            </div>
                        }
                    >
                        <div className="flex justify-between items-center">
                            <h5 className="text-teal-600 my-4">
                                Informações da obra
                            </h5>
                            <button
                                className="btn-primary flex items-center"
                                type="button"
                                onClick={() => editProjectRef.current?.open()}
                            >
                                <AiOutlineEdit className="mr-2" />
                                Editar
                            </button>
                        </div>
                        <div className="grid gap-2 grid-cols-2">
                            <h6>Tipo de obra:</h6>
                            <p>{project?.type}</p>
                            <h6>Endereço:</h6>
                            <p>{capitalize(project?.inlineAddress)}</p>

                            <h6>Secretaria:</h6>
                            <p>{project?.secretary}</p>

                            <h6>Fonte de recurso:</h6>
                            <p>{project?.ressource}</p>

                            <h6>Valor estimado do investimento:</h6>
                            <p>{Masks.currency(project?.value || 0)}</p>

                            {!!project?.counterpartValue && (
                                <>
                                    <h6>Valor de contrapartida:</h6>
                                    <p>
                                        {Masks.currency(
                                            project?.counterpartValue
                                        )}
                                    </p>
                                </>
                            )}

                            <h6>Descrição:</h6>
                            <p>{project?.description}</p>

                            <h6>CNPJ do tomador:</h6>
                            <p>{Masks.cpfCnpj(project?.cnpj || "")}</p>

                            <h6>Responsável pelo cadastro:</h6>
                            <p>{project?.createdby?.name}</p>
                        </div>
                        <hr />

                        <h5 className="text-teal-600 my-4">Cronograma</h5>
                        <div className="grid gap-2 grid-cols-2">
                            <h6>Cadastrado em:</h6>
                            <p>
                                {Masks.date(
                                    project?.startDate?.toString() || 0
                                )}
                            </p>

                            <h6>Data prevista:</h6>
                            <p>
                                {project?.dueDate
                                    ? Masks.date(project.dueDate)
                                    : "Em analíse"}
                            </p>

                            <h6>Quantidade de horas estimadas:</h6>
                            <p>{project?.estimatedHours || "Em analíse"}</p>

                            <h6>Prioridade:</h6>
                            <p>{project?.priority}</p>
                        </div>

                        <hr />

                        <h5 className="text-teal-600 my-4">Anexos</h5>
                        <div className="grid gap-2 grid-cols-2">
                            {project?.attachments?.map((attachment) => (
                                <a
                                    href={attachment.downloadUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={attachment.thumbnail}
                                        alt=""
                                        className="w-12 h-12"
                                    />
                                    {attachment.description}
                                </a>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="col-span-3">
                    <div className="mb-4">
                        <Card title="Projetos relacionados">
                            <ProjectIssuesTable issues={project?.childrens} />
                        </Card>
                    </div>

                    <div className="mb-4">
                        <Card title="Histórico">
                            {project?.history
                                ?.filter((hist) => hist.details.length)
                                .map((change) => (
                                    <>
                                        <h6>
                                            {Masks.dateTime(
                                                change.createdAt.toString()
                                            )}{" "}
                                            {change.note && (
                                                <span>
                                                    Observação: {change.note}
                                                </span>
                                            )}
                                        </h6>
                                        {change.details.map((detail) => {
                                            return (
                                                <div className="grid gap-2 grid-cols-5 border-b-2 mb-2">
                                                    <p>
                                                        <strong>
                                                            {
                                                                historyActionLabel[
                                                                    detail
                                                                        .action
                                                                ]
                                                            }
                                                        </strong>
                                                        :{" "}
                                                    </p>
                                                    <p>
                                                        {capitalize(
                                                            historyNameLabel[
                                                                detail.name
                                                            ]
                                                        )}
                                                    </p>
                                                    <p>
                                                        {detail.oldValue ||
                                                            "---"}
                                                    </p>
                                                    <p>{"=>"}</p>
                                                    <p>
                                                        {detail.newValue ||
                                                            "---"}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </>
                                ))}
                        </Card>
                    </div>
                </div>
            </div>
            {project && (
                <UpdateProjectModal ref={editProjectRef} project={project} />
            )}
        </>
    );
}

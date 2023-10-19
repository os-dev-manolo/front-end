import Accordion from "react-bootstrap/Accordion";
import { LinearProgressBar } from "../../../../components/global";
import Project from "../../../../shared/providers/projects/entities/project.entity";
import Masks from "../../../../shared/utils/mask.utils";

export function ProjectIssuesTable({
    issues,
}: {
    issues: Project["childrens"];
}) {
    if (!issues) return null;
    return (
        <Accordion>
            {issues.map((issue, index) => (
                <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                        <div className="flex flex-col w-50">
                            <h6>{issue.subject}</h6>
                            <div>
                                <LinearProgressBar
                                    progress={issue.doneRatio || 0}
                                />
                            </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="grid gap-2 grid-cols-2">
                            <h6 className="text-sm">Cadastrado em:</h6>
                            <p className="text-sm">
                                {Masks.date(issue?.startDate?.toString() || 0)}
                            </p>

                            <h6 className="text-sm">Data prevista:</h6>
                            <p className="text-sm">
                                {issue.dueDate
                                    ? Masks.date(issue.dueDate)
                                    : "Em analíse"}
                            </p>

                            <h6 className="text-sm">
                                Quantidade de horas estimadas:
                            </h6>
                            <p className="text-sm">
                                {issue.estimatedHours || "Em analíse"}
                            </p>

                            <h6 className="text-sm">Prioridade:</h6>
                            <p className="text-sm">{issue.priority}</p>
                        </div>

                        <hr />

                        <h5 className="text-teal-600 my-4 text-sm">Anexos</h5>
                        <div className="grid gap-2 grid-cols-2">
                            {issue.attachments?.map((attachment) => (
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
                                    <span className="text-sm">
                                        {attachment.description}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
    Modal,
    Badge,
    Spinner,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { IAgendaTypedEvent } from "../../../shared/interfaces/IEvent";
import { AgendaApiService } from "./imports";

interface EventDetailModalProps {
    show: boolean;
    onClose: () => void;
    event: IAgendaTypedEvent | null;
    getEventType: (event: IAgendaTypedEvent) => string;
    getEventTitle: (event: IAgendaTypedEvent) => string;
}

function getTimeToStartOrEnd(start: Date, end: Date) {
    const now = moment();
    const mStart = moment(start);
    const mEnd = moment(end);
    if (now.isBefore(mStart)) {
        const diff = moment.duration(mStart.diff(now));
        if (diff.asDays() >= 1)
            return `Começa em ${Math.floor(diff.asDays())} dia(s)`;
        if (diff.asHours() >= 1)
            return `Começa em ${Math.floor(diff.asHours())} hora(s)`;
        if (diff.asMinutes() >= 1)
            return `Começa em ${Math.floor(diff.asMinutes())} min`;
        return "Começa em instantes";
    } else if (now.isBefore(mEnd)) {
        const diff = moment.duration(mEnd.diff(now));
        if (diff.asDays() >= 1)
            return `Em andamento — termina em ${Math.floor(
                diff.asDays()
            )} dia(s)`;
        if (diff.asHours() >= 1)
            return `Em andamento — termina em ${Math.floor(
                diff.asHours()
            )} hora(s)`;
        if (diff.asMinutes() >= 1)
            return `Em andamento — termina em ${Math.floor(
                diff.asMinutes()
            )} min`;
        return "Em andamento — termina em instantes";
    } else {
        const diff = moment.duration(now.diff(mEnd));
        if (diff.asDays() >= 1)
            return `Já ocorreu há ${Math.floor(diff.asDays())} dia(s)`;
        if (diff.asHours() >= 1)
            return `Já ocorreu há ${Math.floor(diff.asHours())} hora(s)`;
        if (diff.asMinutes() >= 1)
            return `Já ocorreu há ${Math.floor(diff.asMinutes())} min`;
        return "Evento finalizado há instantes";
    }
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
    show,
    onClose,
    event,
    getEventType,
    getEventTitle,
}) => {
    const [members, setMembers] = useState<any[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    useEffect(() => {
        if (show && event?.id) {
            const idBase = Number(String(event.id).split("-")[0]);
            setLoadingMembers(true);
            AgendaApiService.getEventMembers(idBase)
                .then((res) => setMembers(res.data || []))
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                .catch(() => {})
                .finally(() => setLoadingMembers(false));
        } else {
            setMembers([]);
        }
    }, [show, event?.id]);

    // Print handler
    const handlePrint = () => {
        if (!event) return;
        const htmlEvento = `
        <div style="font-family: Arial, sans-serif; max-width:700px; margin:auto;">
            <h2 style="text-align:center; margin-bottom:20px;">
                ${getEventTitle(event)}
            </h2>
            <div style="margin-bottom:6px; text-align:center;">
                <span style="margin-right:12px;"><b>Tipo:</b> ${getEventType(
                    event
                )}</span>
            </div>
            <div style="margin-bottom:6px; text-align:center;">
                <span style="margin-right:12px;"><b>Início:</b> ${moment(
                    event.start
                ).format("DD/MM/YYYY HH:mm")}</span>
                <span><b>Fim:</b> ${moment(event.end).format(
                    "DD/MM/YYYY HH:mm"
                )}</span>
            </div>
            <div style="margin-bottom:10px; text-align:center; color:#666;">
                ${getTimeToStartOrEnd(event.start, event.end)}
            </div>
            <div style="margin:16px 0 0 0;">
                <b>📝 Descrição:</b>
                <div style="margin-top:6px; padding:8px 12px; border-radius:6px; background:#f6f6f6; min-height:36px; white-space:pre-wrap; word-break:break-word;">
                    ${event.description || "-"}
                </div>
            </div>
            <div style="margin:18px 0 0 0;"><b>👤 Participantes:</b></div>
            <ul style="margin:8px 0 0 0; padding:0; list-style:none;">
                ${
                    members && members.length > 0
                        ? members
                              .map(
                                  (m) => `
                    <li style="margin-bottom:9px;">
                        <div style="font-weight:600;">${
                            m.nome ||
                            m.name ||
                            m.pessoa_nome ||
                            m.pessoa_id ||
                            m
                        }</div>
                        <div style="font-size:13px; color:#666;">
                            ${
                                m.email_comercial
                                    ? `<b>Email comercial:</b> ${m.email_comercial} `
                                    : ""
                            }
                            ${
                                m.email_pessoal
                                    ? `<b>Email pessoal:</b> ${m.email_pessoal} `
                                    : ""
                            }
                            ${
                                m.telefone
                                    ? `<b>Telefone:</b> ${m.telefone}`
                                    : ""
                            }
                        </div>
                    </li>
                `
                              )
                              .join("")
                        : `<span style="color:#888; font-size:13px;">Nenhum participante.</span>`
                }
            </ul>
            <div style="font-size:12px; color:#999; margin-top:18px;">
                ${
                    event.originalId
                        ? `<div><b>ID original:</b> ${event.originalId}</div>`
                        : ""
                }
                ${event.id ? `<div><b>ID do evento:</b> ${event.id}</div>` : ""}
            </div>
        </div>
    `;
        const printWindow = window.open("", "_blank", "width=900,height=700");
        if (!printWindow) return;
        printWindow.document.write(`
        <html>
        <head>
            <title>Imprimir Evento</title>
            <style>
                @media print {
                    body { background: #fff !important; }
                }
            </style>
        </head>
        <body>
            ${htmlEvento}
        </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 350);
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
            dialogClassName="event-detail-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title
                    style={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 22,
                        width: "100%",
                    }}
                >
                    {event ? getEventTitle(event) : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                id="modal-to-print-printable"
                style={{ paddingTop: 10 }}
            >
                {event && (
                    <div>
                        {/* Badges lado a lado */}
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                justifyContent: "center",
                                marginBottom: 8,
                            }}
                        >
                            <Badge bg="dark">{getEventType(event)}</Badge>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                                alignItems: "stretch",
                                justifyContent: "center",
                                marginBottom: 6,
                            }}
                        >
                            <div style={{ minWidth: 140, textAlign: "center" }}>
                                <div style={{ fontWeight: 600, color: "#444" }}>
                                    🕒 Início
                                </div>
                                <div>
                                    {moment(event.start).format(
                                        "DD/MM/YYYY HH:mm"
                                    )}
                                </div>
                            </div>
                            <div style={{ minWidth: 140, textAlign: "center" }}>
                                <div style={{ fontWeight: 600, color: "#444" }}>
                                    🕒 Fim
                                </div>
                                <div>
                                    {moment(event.end).format(
                                        "DD/MM/YYYY HH:mm"
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    minWidth: 160,
                                    maxWidth: 210,
                                    textAlign: "center",
                                }}
                            >
                                <div style={{ fontWeight: 600, color: "#444" }}>
                                    ⏳ Tempo
                                </div>
                                <div style={{ whiteSpace: "nowrap" }}>
                                    {getTimeToStartOrEnd(
                                        event.start,
                                        event.end
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div
                            style={{
                                margin: "16px 0 0 0",
                                maxWidth: 650,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            <b>📝 Descrição:</b>
                            <div
                                style={{
                                    marginTop: 6,
                                    padding: "8px 12px",
                                    borderRadius: 6,
                                    background: "#f6f6f6",
                                    minHeight: 36,
                                    maxHeight: 180,
                                    overflowY: "auto",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    fontSize: 15,
                                }}
                            >
                                {event.description || "-"}
                            </div>
                        </div>
                        {/* Participantes */}
                        <div style={{ marginTop: 16 }}>
                            <strong>Participantes:</strong>
                            {loadingMembers ? (
                                <div>
                                    <Spinner size="sm" animation="border" />{" "}
                                    Carregando...
                                </div>
                            ) : members.length > 0 ? (
                                <div
                                    style={{
                                        maxHeight:
                                            members.length > 4 ? 180 : "none",
                                        overflowY:
                                            members.length > 4
                                                ? "auto"
                                                : "visible",
                                        border:
                                            members.length > 4
                                                ? "1px solid #f2f2f2"
                                                : "none",
                                        borderRadius: 8,
                                        padding: members.length > 4 ? 12 : 0,
                                        background:
                                            members.length > 4
                                                ? "#fcfcfc"
                                                : "transparent",
                                        marginTop: 8,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            columnGap: 16,
                                        }}
                                    >
                                        {members.map((m: any, idx: number) => (
                                            <div
                                                key={m.id || idx}
                                                style={{
                                                    width: "calc(50% - 8px)",
                                                    minWidth: 180,
                                                    maxWidth: "100%",
                                                    marginBottom: 0,
                                                    padding: "10px 8px",
                                                    borderBottom:
                                                        "1px dashed #eaeaea",
                                                    borderRadius: 6,
                                                    background: "#fff",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: 15,
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    👤{" "}
                                                    {m.nome ||
                                                        m.name ||
                                                        m.pessoa_nome ||
                                                        m.pessoa_id ||
                                                        m}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 13,
                                                        color: "#555",
                                                        marginLeft: 8,
                                                    }}
                                                >
                                                    {m.email_comercial && (
                                                        <div>
                                                            <span>
                                                                📧{" "}
                                                                <b>
                                                                    Email
                                                                    comercial:
                                                                </b>{" "}
                                                                {
                                                                    m.email_comercial
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                    {m.email_pessoal && (
                                                        <div>
                                                            <span>
                                                                ✉️{" "}
                                                                <b>
                                                                    Email
                                                                    pessoal:
                                                                </b>{" "}
                                                                {
                                                                    m.email_pessoal
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                    {m.telefone && (
                                                        <div>
                                                            <span>
                                                                📱{" "}
                                                                <b>Telefone:</b>{" "}
                                                                {m.telefone}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <span style={{ color: "#888", fontSize: 13 }}>
                                    Nenhum participante.
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 20,
                }}
            >
                {event?.originalId && (
                    <small style={{ marginTop: 2 }}>
                        <strong>ID original:</strong> {event.originalId}
                    </small>
                )}
                {event?.id && (
                    <small>
                        <strong>ID do evento:</strong> {event.id}
                    </small>
                )}
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Imprimir</Tooltip>}
                >
                    <button onClick={() => event && handlePrint()}>🖨️</button>
                </OverlayTrigger>
            </Modal.Footer>
        </Modal>
    );
};

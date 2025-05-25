import { ReactElement, useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Button } from "react-bootstrap";
import { showToast } from "../../../../components/global/toast";
import { NewForm } from "./form";
import { CreateInputs as OfficialsInputs } from "../../officials/components/inputs";
import { PartyInputs } from "../../political-party/components/inputs";
import { CreateInputs as PersonInputs } from "../../register/simple/components/inputs";
import { OfficialType, Party, Persons } from "./inputs";
import { StandardGbpApiService } from "../../../../shared/services/api/standard-gbp-api.service";
import { Select } from "../../../../components/global/select";

export const NewPoliticForm: React.FC = (): ReactElement => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(false);
    const [newPerson, setNewPerson] = useState(false);
    const [newOffical, setNewOfficial] = useState(false);
    const [newParty, setNewParty] = useState(false);

    const handleSubmit = useCallback(async (data: unknown) => {
        console.log(data);
        try {
            setLoading(true);
            await StandardGbpApiService.create({
                path: "crud/politico",
                payload: data,
            });

            showToast({
                type: "success",
                message: "Item criado com sucesso",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleNewOfficial = () => {
        setNewOfficial(!newOffical);
    };
    const handleNewPerson = () => {
        setNewPerson(!newPerson);
    };
    const handleNewParty = () => {
        setNewParty(!newParty);
    };
    return (
        <div className="flex justify-center items-center">
            {newPerson && (
                <NewForm
                    path="crud/pessoa-fisica"
                    title="ADD NOVA PESSOA FÍSICA"
                    fields={PersonInputs.map((input) => input())}
                    doAfterSubmit={() => setNewPerson(!newPerson)}
                    classNameStyle="grid grid-cols-2 gap-2"
                />
            )}
            {newOffical && (
                <NewForm
                    path="crud/cargos-politicos"
                    title="ADD NOVO CARGO POLITICO"
                    fields={OfficialsInputs.map((input) => input())}
                    doAfterSubmit={() => setNewOfficial(!newOffical)}
                />
            )}
            {newParty && (
                <NewForm
                    path="crud/partidos-politicos"
                    title="ADD NOVO PARTIDO POLITICO"
                    fields={PartyInputs.map((input) => input())}
                    doAfterSubmit={() => setNewParty(!newParty)}
                />
            )}
            {!newPerson && !newOffical && !newParty && (
                <Form onSubmit={handleSubmit} ref={formRef} className="w-2/4">
                    <div className="flex space-y-3.5">
                        <OfficialType />

                        <Button
                            variant="info"
                            type="button"
                            onClick={handleNewOfficial}
                        >
                            NOVO CARGO
                        </Button>
                    </div>
                    <div className="flex space-y-3.5">
                        <Persons />

                        <Button
                            variant="info"
                            type="button"
                            onClick={handleNewPerson}
                        >
                            NOVA PESSOA
                        </Button>
                    </div>
                    <div className="flex space-y-3.5">
                        <Party />

                        <Button
                            variant="info"
                            type="button"
                            onClick={handleNewParty}
                        >
                            NOVO PARTIDO
                        </Button>
                    </div>

                    <Select
                        name="estado"
                        label="Estado"
                        options={[
                            {
                                label: "Paraná",
                                value: "PR",
                            },
                            {
                                label: "Santa Catarina",
                                value: "SC",
                            },
                            {
                                label: "São Paulo",
                                value: "SP",
                            },
                        ]}
                    />
                    <Select
                        name="cidade"
                        label="Cidade"
                        options={[
                            {
                                label: "Curitiba",
                                value: "Curitiba",
                            },
                            {
                                label: "Londrina",
                                value: "Londrina",
                            },
                            {
                                label: "Maringá",
                                value: "Maringá",
                            },
                        ]}
                    />

                    <div className="flex justify-center items-center mt-2">
                        <Button variant="success" type="submit">
                            CADASTRAR
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

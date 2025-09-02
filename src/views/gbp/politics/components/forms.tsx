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

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
            {/* Modais com títulos institucionais */}
            <div className={newPerson ? "block" : "hidden"}>
                <NewForm
                    path="crud/pessoa-fisica"
                    title="Adicionar nova pessoa física"
                    fields={PersonInputs.map((input) => input())}
                    doAfterSubmit={() => setNewPerson(false)}
                    classNameStyle="grid grid-cols-2 gap-4"
                />
            </div>

            <div className={newOffical ? "block" : "hidden"}>
                <NewForm
                    path="crud/cargos-politicos"
                    title="Adicionar novo cargo político"
                    fields={OfficialsInputs.map((input) => input())}
                    doAfterSubmit={() => setNewOfficial(false)}
                    classNameStyle="grid grid-cols-2 gap-4"
                />
            </div>

            <div className={newParty ? "block" : "hidden"}>
                <NewForm
                    path="crud/partidos-politicos"
                    title="Adicionar novo partido político"
                    fields={PartyInputs.map((input) => input())}
                    doAfterSubmit={() => setNewParty(false)}
                    classNameStyle="grid grid-cols-2 gap-4"
                />
            </div>

            {/* Form principal */}
            {!newPerson && !newOffical && !newParty && (
                <div className="bg-white shadow-md rounded-xl p-6 ">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                        Cadastro de Político
                    </h2>
                    <Form
                        onSubmit={handleSubmit}
                        ref={formRef}
                        className="space-y-5"
                    >
                        {/* Cargo */}
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <OfficialType />
                            <Button
                                variant="outline-primary"
                                type="button"
                                className="px-3 py-1 text-sm"
                                onClick={() => setNewOfficial(true)}
                            >
                                Novo Cargo
                            </Button>
                        </div>

                        {/* Pessoa */}
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <Persons />
                            <Button
                                variant="outline-primary"
                                type="button"
                                className="px-3 py-1 text-sm"
                                onClick={() => setNewPerson(true)}
                            >
                                Nova Pessoa
                            </Button>
                        </div>

                        {/* Partido */}
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                            <Party />
                            <Button
                                variant="outline-primary"
                                type="button"
                                className="px-3 py-1 text-sm"
                                onClick={() => setNewParty(true)}
                            >
                                Novo Partido
                            </Button>
                        </div>

                        {/* Estado + Cidade + Salvar */}
                        <div className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
                            <Select
                                name="estado"
                                label="Estado"
                                options={[
                                    { label: "Paraná", value: "PR" },
                                    { label: "Santa Catarina", value: "SC" },
                                    { label: "São Paulo", value: "SP" },
                                ]}
                            />
                            <Select
                                name="cidade"
                                label="Cidade"
                                options={[
                                    { label: "Curitiba", value: "Curitiba" },
                                    { label: "Londrina", value: "Londrina" },
                                    { label: "Maringá", value: "Maringá" },
                                ]}
                            />
                            <Button
                                variant="success"
                                type="submit"
                                disabled={loading}
                                className="px-4 py-1 text-sm"
                            >
                                {loading ? "Enviando..." : "Salvar"}
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { SecundaryButton, Select } from "../../../global";
import { SelectOptions } from "../../../../shared/interfaces/ISelectOptions";
import { showToast } from "../../../global/toast";
import { useRoles } from "../../../../shared/hooks/providers/useRoles";

interface RolesForm {
    doAfterSubmit?(grpId: number): Promise<void>;
    disabled?: boolean;
}

export const RolesForm: React.FC<RolesForm> = ({
    doAfterSubmit,
    disabled = false,
}) => {
    const { getGroupsAsOptions } = useRoles();
    const formRef = useRef<FormHandles>(null);

    const [roles, setRoles] = useState<SelectOptions[]>();

    const handleSubmit = useCallback(
        async ({ groupId }: { groupId?: number }) => {
            if (!groupId) {
                showToast({ type: "info", message: "Selecione um grupo." });
                return;
            }

            if (doAfterSubmit) await doAfterSubmit(groupId);
        },
        [doAfterSubmit]
    );

    useEffect(() => {
        (async () => {
            const rolesOptions = await getGroupsAsOptions();

            setRoles(rolesOptions);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-center items-center mt-4">
            <Form onSubmit={handleSubmit} ref={formRef} className="w-2/4">
                <Select
                    name="groupId"
                    options={roles}
                    label="Grupos de acesso"
                    width="565px"
                />
                <div className="flex justify-center items-center">
                    <div className="w-2/4">
                        <SecundaryButton
                            type="submit"
                            disabled={disabled || !roles}
                        >
                            BUSCAR
                        </SecundaryButton>
                    </div>
                </div>
            </Form>
        </div>
    );
};

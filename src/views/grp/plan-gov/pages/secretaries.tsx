import React, { useRef, useState } from "react";

import { FormHandles } from "@unform/core";

import {
    Container,
    RolesForm,
    Footer,
    Tabs,
} from "../../../../components/page-releated/access-control/_index";
import { IAllowedFeatures } from "../../../../shared/interfaces/IFeatures";
import { RolesApiService } from "../../../../shared/services/api/roles-api.service";
import { LocalLoading } from "../../../../components/global";
import { showToast } from "../../../../components/global/toast";
import { ApiErrorHandler } from "../../../../shared/utils/errors.utils";
import { TabsProps } from "../../../../components/page-releated/access-control/tabs/interfaces";
import { Header } from "../../../../components/page-releated/grp-standard-screen/header";

export default () => {
    const formRef = useRef<FormHandles>(null);

    const [selectedRole, setSelectedRole] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [allowedFeatures, setAllowedFeatures] = useState<IAllowedFeatures[]>(
        []
    );

    const fetchRolesAccesses = async (roleId: number) => {
        setLoading(true);
        setSelectedRole(roleId);

        try {
            const roleAllowedFeatures = await RolesApiService.getPermissions(
                roleId
            );

            formRef.current?.reset();

            setAllowedFeatures(roleAllowedFeatures);
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    };

    const saveRolePermission: TabsProps["onSubmit"] = async (data) => {
        if (!selectedRole) return;

        setLoading(true);

        try {
            await RolesApiService.createPermissions(selectedRole, data);

            showToast({
                type: "success",
                message: "Permissões criadas com sucesso!",
            });
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    };

    // if (loading) return <LocalLoading />;

    return (
        <>
            <Header title="Plano de governo" disableButtons />
            <RolesForm doAfterSubmit={fetchRolesAccesses} disabled={loading} />
            {loading && <LocalLoading />}
            <div className={!selectedRole || loading ? "hidden" : ""}>
                <Container>
                    <Tabs
                        ref={formRef}
                        roleAllowedFeatures={allowedFeatures}
                        onSubmit={saveRolePermission}
                    />
                </Container>
                <Footer>
                    <button
                        className="w-64 p-2 bg-teal-0 hover:bg-teal-700 text-teal-700 hover:text-white"
                        type="submit"
                        onClick={() => formRef.current?.submitForm()}
                        disabled={loading}
                    >
                        SALVAR
                    </button>
                </Footer>
            </div>
        </>
    );
};

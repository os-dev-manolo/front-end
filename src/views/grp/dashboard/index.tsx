import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../../shared/interfaces/IUser";

import { Table } from "../../../components/page-releated/grp-standard-screen/table";
import { LocalLoading } from "../../../components/global";
import { Header } from "../../../components/page-releated/grp-standard-screen/header";
import { StandardGrpApiService } from "../../../shared/services/api/standard-grp-api.service";

import tableColumns from "./table-columns";

export default () => {
    const [users, setUsers] = useState<IUser[]>();

    const fetchUsers = useCallback(async () => {
        const { data } = await StandardGrpApiService.get<IUser>({
            params: { where: JSON.stringify({ usu_ativo: false }) },
            path: "users/manager",
            relations: ["role"],
        });

        setUsers(data);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <>
            <Header title="Dashboard" disableButtons />
            {users ? (
                <>
                    <h5 className="mb-3 mt-3">
                        {users.length} Usuários pendentes de aprovação
                    </h5>
                    <Table dataSource={users} columns={tableColumns} />
                </>
            ) : (
                <LocalLoading />
            )}
        </>
    );
};

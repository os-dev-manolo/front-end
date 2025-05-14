import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../../shared/interfaces/IUser";

import { Table } from "../../../components/page-releated/grp-standard-screen/table";
import { LocalLoading } from "../../../components/global";
import { Header } from "../../../components/page-releated/grp-standard-screen/header";
import { StandardGrpApiService } from "../../../shared/services/api/standard-grp-api.service";

import tableColumns from "./table-columns";

export default () => {
    return (
        <>
            <Header title="Dashboard" disableButtons />
            {/* {users ? (
                <>
                    <h5 className="mb-3 mt-3">
                        {users.length} Usuários pendentes de aprovação
                    </h5>
                    <Table dataSource={users} columns={tableColumns} />
                </>
            ) : (
                <LocalLoading />
            )} */}
            <div>Atendimentos</div>
            <div>Eleitores</div>
            <div>Resposta a Pesquisas</div>
            <div>Compromissos</div>
            <div>Aniversariantes este mês</div>
            <div>Solicitações</div>
            <div>Emendas</div>
            <div>Respostas SMS</div>
            <div>Novos Cadastros</div>
            <div>Solicitações Atendidas</div>
            <div>Agenda do dia</div>
            <div>Ultimas Solicitações</div>
            <div>Ultimas atualizações</div>
        </>
    );
};

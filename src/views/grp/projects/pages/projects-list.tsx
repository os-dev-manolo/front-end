import React, { useEffect, useRef, useState } from "react";
import { useProjects } from "../../../../shared/hooks/providers/useProjects";
import Project from "../../../../shared/providers/projects/entities/project.entity";

import { Table } from "../../../../components/page-releated/grp-standard-screen/table";
import tableColumns from "../components/table-columns";
import RegisterProjectModal from "../components/register-project-modal";
import { ModalHandles } from "../../../../components/global/modal";
import { LocalLoading } from "../../../../components/global";

export default function ProjectsList() {
    const registerModalRef = useRef<ModalHandles>(null);
    const [projects, setProjects] = useState<Project[]>();
    const [loading, setLoading] = useState(false);

    const { getAllProjects } = useProjects();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const proj = await getAllProjects();

                setProjects(proj);
            } finally {
                setLoading(false);
            }
        };

        if (!projects) fetchProjects();
    }, [getAllProjects, projects]);

    const content = () => {
        if (loading) return <LocalLoading />;

        if (!projects) return null;

        return <Table dataSource={projects} columns={tableColumns} />;
    };

    return (
        <>
            <header className="w-full h-28 border-b border-slate-500 flex justify-between">
                <h5 className="text-slate-700 pt-5 pl-4">Projetos</h5>

                <section className="self-end flex space-x-4">
                    <button
                        type="button"
                        onClick={() => registerModalRef.current?.open()}
                        className="btn-primary mb-2"
                        disabled={loading}
                    >
                        Cadastrar
                    </button>
                </section>
            </header>

            {content()}

            <RegisterProjectModal ref={registerModalRef} />
        </>
    );
}

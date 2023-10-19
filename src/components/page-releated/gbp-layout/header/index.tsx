import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Tooltip } from "../../../global";
import { useAuth } from "../../../../shared/hooks/useAuth";

export const HeaderGbp: React.FC = () => {
    const { signOut } = useAuth();
    return (
        <div
            className="px-4 absolute h-12 ml-40 w-100 bg-transparent flex items-center justify-between"
            style={{ maxWidth: "calc(100vw - 160px)" }}
        >
            <div />
            <div className="flex space-x-5 text-purple-700">
                <Tooltip text="Sair" placement="bottom">
                    <button type="button" onClick={signOut}>
                        <BiLogOut size={35} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

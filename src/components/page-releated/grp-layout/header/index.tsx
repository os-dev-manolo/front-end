import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { Tooltip } from "../../../global";
import { useAuth } from "../../../../shared/hooks/useAuth";

export const Header: React.FC = () => {
    const { signOut } = useAuth();
    return (
        <div
            className="px-4 absolute h-12 ml-40 w-100 bg-transparent flex items-center justify-between"
            style={{ maxWidth: "calc(100vw - 160px)" }}
        >
            <div />
            <div className="flex space-x-5 text-teal-700">
                <Tooltip text="sair" placement="bottom">
                    <button type="button" onClick={signOut}>
                        <FaPowerOff size={25} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

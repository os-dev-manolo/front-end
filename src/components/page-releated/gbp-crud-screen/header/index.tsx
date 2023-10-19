import React from "react";
import { IconBaseProps } from "react-icons";

import { FaFilter, FaPlus } from "react-icons/fa";

interface ButtonProps {
    onClick?(): void;
    Icon: React.ComponentType<IconBaseProps>;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, Icon }) => (
    <button
        className="flex items-center text-slate-700 hover:text-teal-600"
        type="button"
        onClick={onClick}
    >
        <Icon className="mr-2" />
        <p className="m-0">{text}</p>
    </button>
);

interface HeaderProps {
    title: string;
    doAfterFilterClick?(): void;
    doAfterRegisterClick?(): void;
    disableButtons?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    doAfterFilterClick,
    doAfterRegisterClick,
    disableButtons,
}) => {
    return (
        <header className="w-full h-28 border-b border-slate-500 flex justify-between">
            <h5 className="text-slate-700 pt-5 pl-4">{title}</h5>
            {!disableButtons && (
                <section className="pr-4 self-end flex space-x-4">
                    {/* <Button
                        onClick={doAfterFilterClick}
                        Icon={FaTable}
                        text="campos"
                    />
                    <Button
                        onClick={doAfterFilterClick}
                        Icon={FaFile}
                        text="relatórios"
                    /> */}
                    <Button
                        onClick={doAfterFilterClick}
                        Icon={FaFilter}
                        text="filtros"
                    />
                    <Button
                        onClick={doAfterRegisterClick}
                        Icon={FaPlus}
                        text="cadastro"
                    />
                </section>
            )}
        </header>
    );
};

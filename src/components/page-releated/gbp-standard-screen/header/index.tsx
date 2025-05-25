import React from "react";
import { IconBaseProps } from "react-icons";

import { FaFilter, FaPlus, FaTable } from "react-icons/fa";

interface ButtonProps {
    onClick?(): void;
    Icon: React.ComponentType<IconBaseProps>;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, Icon }) => (
    <button
        className="flex items-center text-purple-700 hover:text-orange-600"
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
    doAfterFieldsClick?(): void;
    disableButtons?: boolean;
}

export const HeaderGbp: React.FC<HeaderProps> = ({
    title,
    doAfterFilterClick,
    doAfterRegisterClick,
    doAfterFieldsClick,
    disableButtons,
}) => {
    return (
        <header className="w-full h-28 border-b border-purple-500 flex justify-between">
            <h5 className="text-purple-700 pt-5 pl-4">{title}</h5>
            {!disableButtons && (
                <section className="pr-4 self-end flex space-x-4">
                    <Button
                        onClick={doAfterFieldsClick}
                        Icon={FaTable}
                        text="Campos"
                    />
                    {/* <Button
                        onClick={doAfterFilterClick}
                        Icon={FaFile}
                        text="relatórios"
                    /> */}
                    <Button
                        onClick={doAfterFilterClick}
                        Icon={FaFilter}
                        text="Filtrar"
                    />
                    <Button
                        onClick={doAfterRegisterClick}
                        Icon={FaPlus}
                        text="Cadastrar"
                    />
                </section>
            )}
        </header>
    );
};

import { IconType } from "react-icons";
import { FaEdit, FaTrashAlt, FaRegClone } from "react-icons/fa";
import { ActionsButtonsEnum } from "../../../../shared/enums/actions-buttons.enum";

import { ActionButton } from "./actions-button";

interface ActionsProps {
    doAfterClick?(value: string | number): void;
    value: string | number;
    tooltipText: string;
    icon: IconType;
    color?: string;
}

export function ActionMaker({
    doAfterClick,
    value,
    icon,
    tooltipText,
    color,
}: ActionsProps) {
    return (
        <ActionButton
            icon={icon}
            tooltip={{ text: tooltipText }}
            color={color}
            onClick={() => {
                if (doAfterClick) doAfterClick(value);
            }}
        />
    );
}

export const DeleteAction = ({
    value,
    doAfterClick,
}: Pick<ActionsProps, "value" | "doAfterClick">) =>
    ActionMaker({
        icon: FaTrashAlt,
        tooltipText: "Deletar",
        color: "tomato",
        value,
        doAfterClick,
    });

export const EditAction = ({
    value,
    doAfterClick,
}: Pick<ActionsProps, "value" | "doAfterClick">) =>
    ActionMaker({
        icon: FaEdit,
        tooltipText: "Editar",
        color: "black",
        value,
        doAfterClick,
    });

export const CloneAction = ({
    value,
    doAfterClick,
}: Pick<ActionsProps, "value" | "doAfterClick">) =>
    ActionMaker({
        icon: FaRegClone,
        tooltipText: "Clonar",
        value,
        doAfterClick,
    });

export const DefaultActions = ({
    value,
    doAfterClick,
    leftActions,
    rightActions,
}: {
    value: number;
    doAfterClick: (action: string, id: number) => Promise<void>;
    leftActions?: React.ReactNode;
    rightActions?: React.ReactNode;
}) => {
    return (
        <div className="flex space-x-3.5">
            {leftActions}
            <CloneAction
                value={value}
                doAfterClick={(id) =>
                    doAfterClick(ActionsButtonsEnum.CLONE, id as number)
                }
            />
            <EditAction
                value={value}
                doAfterClick={(id) =>
                    doAfterClick(ActionsButtonsEnum.EDIT, id as number)
                }
            />
            <DeleteAction
                value={value}
                doAfterClick={(id) =>
                    doAfterClick(ActionsButtonsEnum.DELETE, id as number)
                }
            />
            {rightActions}
        </div>
    );
};

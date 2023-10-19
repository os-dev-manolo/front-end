import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { useAuth } from "../../../../shared/hooks/useAuth";
import { useSearchSideBar } from "../../../../shared/hooks/useSideBar";

import { RoundedButton } from "../../../global";
import { useToggle } from "../../../../shared/hooks/useToggle";
import { FeaturesEnum } from "../../../../shared/enums/features.enum";

export const SearchMenu: React.FC = () => {
    const { setShouldOpen, shouldOpen } = useSearchSideBar();
    const { user } = useAuth();
    const { isActive, toggle } = useToggle();

    const [canSearch, setCanSearch] = useState<boolean>(false);

    const toggleLayersSideBarStatus = () => {
        setShouldOpen(!shouldOpen);
        toggle();
    };

    useEffect(() => {
        const allowedActions =
            user.authorizationsByFeatureName[FeaturesEnum.PROPERTIES]
                ?.featureAllowedActions;

        setCanSearch(
            allowedActions
                ? allowedActions.includes("read") || allowedActions === "*"
                : false
        );
    }, [user]);

    useEffect(() => {
        if (!shouldOpen && isActive) toggle();
    }, [shouldOpen, isActive, toggle]);

    if (!canSearch) return null;

    return (
        <RoundedButton
            onClick={toggleLayersSideBarStatus}
            description="BUSCAR"
            active={isActive}
        >
            <AiOutlineSearch size={40} className="inline-block" />
        </RoundedButton>
    );
};

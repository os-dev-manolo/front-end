import React, { useCallback } from "react";
import { useAuth } from "../../../../../shared/hooks/useAuth";
import { SignoutIcon } from "../../../../../shared/assets/icons";

import { RoundedButton } from "../../../../global";

export const SignoutButton: React.FC = () => {
    const { signOut } = useAuth();
    const handleSignOut = useCallback(() => {
        signOut();
    }, [signOut]);
    return (
        <RoundedButton
            onClick={handleSignOut}
            description="SAIR"
            tooltipPosition="left"
        >
            <img
                src={SignoutIcon}
                alt="sait"
                className="h-7 w-7 md:h-10 md:w-10"
            />
        </RoundedButton>
    );
};

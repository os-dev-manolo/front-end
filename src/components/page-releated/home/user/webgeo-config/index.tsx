import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../../../global";

import { GrpIcon } from "../../../../../shared/assets/icons";
import { useAuth } from "../../../../../shared/hooks/useAuth";
import { FeaturesEnum } from "../../../../../shared/enums/features.enum";

export const Grp: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    if (
        !user ||
        !user.authorizationsByFeatureName[FeaturesEnum.GRP_ACCESS]?.canRead
    )
        return null;

    return (
        <RoundedButton
            description="CONFIGURAÇÕES WEBGEO"
            onClick={() => navigate("/grp")}
            tooltipPosition="left"
        >
            <img src={GrpIcon} className="h-7 w-7 md:h-10 md:w-10" alt="grp" />
        </RoundedButton>
    );
};

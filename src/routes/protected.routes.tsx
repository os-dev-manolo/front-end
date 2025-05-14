import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../shared/hooks/useAuth";
import { FeaturesEnum } from "../shared/enums/features.enum";
import { GpbLayout } from "../layout/gbp";

interface ProtectedRoutesProps {
    restricted?: boolean;
    children?: React.ReactElement;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
    restricted,
    children,
}) => {
    const { signed, user } = useAuth();

    // if (restricted) {
    //     if (
    //         !signed ||
    //         !user.authorizationsByFeatureName[FeaturesEnum.GBP_ACCESS]?.canRead
    //     )
    //         return <Navigate to="/gbp/login" />;

    //     return (
    //         <GpbLayout>
    //             <Outlet />
    //         </GpbLayout>
    //     );
    // }

    // if (!signed) return <Navigate to="/" />;

    // return children || null;
    return (
        <GpbLayout>
            <Outlet />
        </GpbLayout>
    );
};

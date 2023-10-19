import React from "react";

import environments from "../../../../environments";
import { CarambeiContact } from "./providers/carambei";

import { CastroContact } from "./providers/castro";
import { JczContact } from "./providers/jcz";
import { StandardContact } from "./providers/standard";

export const Contact: React.FC = () => {
    switch (environments.client.name) {
        case "castro":
            return <CastroContact />;
        case "jcz":
            return <JczContact />;
        case "carambei":
            return <CarambeiContact />;
        default:
            return <StandardContact />;
    }
};

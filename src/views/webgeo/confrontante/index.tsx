import React from "react";
import environments from "../../../environments";
import { JczConfrontante } from "./providers/jcz";
import { JgvConfrontante } from "./providers/jgv";

import { StandardConfrontante } from "./providers/standard";

export const Confrontante: React.FC = () => {
    switch (environments.client.name) {
        case "jgv":
            return <JgvConfrontante />;
        case "jcz":
            return <JczConfrontante />;
        default:
            return <StandardConfrontante />;
    }
};

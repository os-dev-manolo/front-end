import React from "react";
import environments from "../../../environments";
import { JaguariaivaBci } from "./providers/jaguariaiva";

import { StandardBci } from "./providers/standard";

export const Bci: React.FC = () => {
    switch (environments.client.name) {
        case "jgv":
            return <JaguariaivaBci />;
        default:
            return <StandardBci />;
    }
};

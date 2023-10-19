import environments from "../../../../environments";
import { JczCnaesDescription } from "./providers/jacarezinho";
import { StandardCnaesDescription } from "./providers/standard";

export const CnaesDescription: React.FC = () => {
    switch (environments.client.name) {
        case "jcz":
            return <JczCnaesDescription />;
        default:
            return <StandardCnaesDescription />;
    }
};

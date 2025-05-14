import environments from "../../../../environments";
import { JczConclusion } from "./providers/jacarezinho";
import { StandardConclusion } from "./providers/standard";

export const Conclusion: React.FC = () => {
    switch (environments.client.name) {
        case "jcz":
            return <JczConclusion />;
        default:
            return <StandardConclusion />;
    }
};

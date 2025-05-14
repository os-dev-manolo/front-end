import environments from "../../../../environments";
import { IProperty } from "../../../../shared/interfaces/IProperties";
import { CarambeiUsoSolo } from "./providers/carambei";
import { JczUsoSolo } from "./providers/jcz";
import { StandardUsoSolo } from "./providers/standard";

interface Props {
    propertyInfo?: IProperty;
}

export const UsoSolo: React.FC<Props> = ({ propertyInfo }) => {
    switch (environments.client.name) {
        case "carambei":
            return <CarambeiUsoSolo propertyInfo={propertyInfo} />;
        case "jcz":
            return <JczUsoSolo propertyInfo={propertyInfo} />;
        default:
            return <StandardUsoSolo />;
    }
};

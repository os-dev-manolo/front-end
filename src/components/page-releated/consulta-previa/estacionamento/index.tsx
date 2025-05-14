import environments from "../../../../environments";
import { CarambeiEstacionamento } from "./providers/carambei";
import { JacarezinhoEstacionamento } from "./providers/jcz";
import { StandardEstacionamento } from "./providers/standard";

export const ParkingLot: React.FC = () => {
    switch (environments.client.name) {
        case "carambei":
            return <CarambeiEstacionamento />;
        case "jcz":
            return <JacarezinhoEstacionamento />;
        default:
            return <StandardEstacionamento />;
    }
};

import { IGrpRoutesConfig } from "../../../shared/interfaces/IGrpConfig";
import GovPlansMenus from "./menus";
import Goals from "./pages/goals";

const GovPlans: IGrpRoutesConfig[] = [
    {
        key: "gov_plans",
        path: "plano_governo",
        element: GovPlansMenus,
    },
    {
        key: "goals",
        path: "plano_governo/gov_goals/list-goals",
        element: Goals,
    },
];

export default GovPlans;

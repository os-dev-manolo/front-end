import { IFormatedGrantedAccess, IGrantedAccess } from "./interfaces";

export const formatGrantedAccess = (
    data: IGrantedAccess
): IFormatedGrantedAccess[] => {
    return Object.values(data).map((grantedAccess) => {
        const feature = grantedAccess.details.featId;

        const ressources =
            grantedAccess.details.hasRessources === "true"
                ? (grantedAccess.ressources
                      ?.map((element, index) => {
                          if (element === "true") return index;

                          return undefined;
                      })
                      .filter((res) => !!res) as number[]) || []
                : "*";

        const actions = Object.entries(grantedAccess.actions)
            .filter(([, value]) => value === "true")
            .map(([key]) => key);

        return {
            featureId: +feature,
            ressources,
            actions,
        };
    });
};

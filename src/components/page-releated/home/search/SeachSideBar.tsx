import React, { useCallback, useEffect, useState } from "react";

import { SideBars } from "../../../global";

import { SearchForm } from "./SearchForm";
import { useSearchSideBar } from "../../../../shared/hooks/useSideBar";
import { useAuth } from "../../../../shared/hooks/useAuth";
import SearchInputsConfig from "../../../../config/webgeo/SearchInputsConfig";
import { FeaturesEnum } from "../../../../shared/enums/features.enum";

export const SearchSideBar: React.FC = () => {
    const { setShouldOpen, shouldOpen } = useSearchSideBar();
    const { user } = useAuth();
    const [searchInputs, setSearchInputs] = useState<string[]>([]);

    const fetchSearchInputs = useCallback(() => {
        const allowedRessources =
            user.authorizationsByFeatureName[FeaturesEnum.PROPERTIES]
                ?.featureAllowedRessources || [];

        const inputs =
            allowedRessources === "*"
                ? Object.keys(SearchInputsConfig)
                : allowedRessources.map((ressource) => ressource.name);

        setSearchInputs(Array.from(new Set(inputs)));
    }, [user]);

    useEffect(() => {
        fetchSearchInputs();
    }, [fetchSearchInputs]);

    const RenderSearchForm = useCallback(() => {
        if (searchInputs.length) return <SearchForm inputs={searchInputs} />;

        return <p>Nenhum campo de pesquisa encontrado</p>;
    }, [searchInputs]);

    return (
        <SideBars
            orientation="right"
            handleClose={() => setShouldOpen(false)}
            show={shouldOpen}
        >
            <RenderSearchForm />
        </SideBars>
    );
};

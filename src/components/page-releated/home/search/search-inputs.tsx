import React from "react";

import SearchInputsConfig from "../../../../config/webgeo/SearchInputsConfig";
import { Input } from "../../../global";

interface SearchInputs {
    input: string;
}

export const SearchInputs: React.FC<SearchInputs> = ({ input }) => {
    const inputConfig = SearchInputsConfig[input];

    if (!inputConfig) return null;

    return (
        <div className="flex flex-col" key={input}>
            <Input
                name={input}
                label={inputConfig.label}
                icon={inputConfig.icon}
            />
        </div>
    );
};

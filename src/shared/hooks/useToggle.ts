import { useState } from "react";

export const useToggle = (initialState = false) => {
    const [isActive, setIsActive] = useState(initialState);

    const toggle = () => {
        setIsActive(!isActive);
    };

    return { isActive, toggle };
};

import React, { InputHTMLAttributes } from "react";

export const Switch = React.forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>((inputProps, ref) => {
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="relative items-center cursor-pointer">
            <input
                ref={ref}
                type="checkbox"
                value=""
                className="sr-only peer"
                {...inputProps}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-900" />
        </label>
    );
});

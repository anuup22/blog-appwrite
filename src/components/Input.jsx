import React from "react";
import { useId } from "react";

const Input = React.forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            //&&: if label is true, then render the label
            {label && <label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label>}
            <input 
            type={type}
            className={`px-3 py-2 border rounded-lg w-full bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input;
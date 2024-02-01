import { HTMLInputTypeAttribute } from "react";
import { UseControllerProps } from "react-hook-form";
import { styled } from "../../../styled-system/jsx";
import { input } from "../../../styled-system/recipes";
import FormField, { FormFieldProps } from "./FormField";

const InputPrimitive = styled("input", input);

interface InputProps
	extends UseControllerProps,
		Omit<FormFieldProps, "children"> {
	type?: HTMLInputTypeAttribute;
}

const Input = ({
	label,
	type = "text",
	placeholder,
	required,
	...props
}: InputProps) => {
	return (
		<FormField
			label={label}
			defaultValue={props.defaultValue ?? ""}
			required={required}
			{...props}
		>
			<InputPrimitive
				type={type}
				placeholder={placeholder ?? `Enter ${props.name}`}
			/>
		</FormField>
	);
};

export default Input;

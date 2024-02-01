import { UseControllerProps } from "react-hook-form";
import { styled } from "../../../styled-system/jsx";
import { textarea } from "../../../styled-system/recipes";
import FormField, { FormFieldProps } from "./FormField";

const TextareaPrimitive = styled("textarea", textarea);

interface TextareaProps
	extends UseControllerProps,
		Omit<FormFieldProps, "children"> {}

const Textarea = ({
	label,
	placeholder,
	required,
	...props
}: TextareaProps) => {
	return (
		<FormField
			label={label}
			defaultValue={props.defaultValue ?? ""}
			required={required}
			{...props}
		>
			<TextareaPrimitive placeholder={placeholder ?? `Enter ${props.name}`} />
		</FormField>
	);
};

export default Textarea;

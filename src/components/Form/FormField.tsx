import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { css } from "../../../styled-system/css";

export interface FormFieldProps extends UseControllerProps {
	label: string;
	placeholder?: string;
	helperText?: string;
	required?: boolean;
	children: ReactNode;
}

const FormField = ({
	label,
	helperText,
	required = true,
	children,
	...props
}: FormFieldProps) => {
	const { field, fieldState } = useController({ ...props });

	const id = props.name;
	const message = fieldState.error?.message;

	return (
		<div
			className={css({
				display: "flex",
				flexDirection: "column",
				gap: "2",
			})}
		>
			<label
				htmlFor={id}
				className={css({
					textStyle: "sm",
					lineHeight: "none",
					fontWeight: "medium",
					_peerDisabled: {
						cursor: "not-allowed",
						opacity: "0.7",
					},
					_after: required
						? {
								content: '"*"',
								color: "red.400",
								ml: "1",
						  }
						: {},
				})}
			>
				{label}
			</label>
			<Slot
				id={id}
				aria-describedby={!fieldState.error ? id : `${id}} ${message}`}
				aria-invalid={!!fieldState.error}
				aria-required={required}
				onValueChange={field.onChange}
				{...field}
			>
				{children}
			</Slot>
			{helperText && (
				<p
					className={css({
						textStyle: "sm",
						color: "muted.foreground",
					})}
				>
					{helperText}
				</p>
			)}
			<p
				className={css({
					textStyle: "sm",
					fontWeight: "medium",
					color: "destructive",
				})}
			>
				{message}
			</p>
		</div>
	);
};

export default FormField;

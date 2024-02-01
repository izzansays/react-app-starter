import * as SelectPrimitive from "@radix-ui/react-select";
import { UseControllerProps } from "react-hook-form";
import { RxCheck, RxChevronDown } from "react-icons/rx";
import { css } from "../../../styled-system/css";
import FormField, { FormFieldProps } from "./FormField";

interface SelectProps
	extends UseControllerProps,
		Omit<FormFieldProps, "children"> {
	options: {
		label: string;
		value: string;
		disabled?: boolean;
	}[];
	disabledKey?: string;
}

const Select = ({
	label,
	placeholder,
	required,
	options,
	...props
}: SelectProps) => {
	return (
		<FormField
			label={label}
			defaultValue={props.defaultValue ?? ""}
			required={required}
			{...props}
		>
			<SelectPrimitive.Root>
				<SelectTrigger>
					<SelectPrimitive.Value
						placeholder={placeholder ?? `Select ${props.name}`}
					/>
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem value={option.value}>{option.label}</SelectItem>
					))}
				</SelectContent>
			</SelectPrimitive.Root>
		</FormField>
	);
};

export default Select;

const SelectTrigger = ({ children }: any) => {
	return (
		<SelectPrimitive.Trigger
			className={css({
				display: "flex",
				h: "10",
				w: "full",
				alignItems: "center",
				justifyContent: "space-between",
				rounded: "md",
				border: "input",
				bg: "transparent",
				px: "3",
				py: "2",
				textStyle: "sm",
				cursor: "pointer",
				focusRingOffsetColor: "background",

				_placeholder: {
					color: "muted.foreground",
				},

				_focus: {
					outline: "2px solid transparent",
					outlineOffset: "2px",
					focusRingWidth: "2",
					focusRingColor: "ring",
					focusRingOffsetWidth: "2",
				},

				_disabled: {
					cursor: "not-allowed",
					opacity: "0.5",
				},
			})}
		>
			{children}
			<SelectPrimitive.Icon>
				<RxChevronDown
					className={css({
						h: "4",
						w: "4",
						opacity: "0.5",
					})}
				/>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
};

const SelectContent = ({ children, position = "popper" }: any) => {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				position={position}
				data-position={position}
				className={css({
					position: "relative",
					zIndex: 50,
					minW: "8rem",
					overflow: "hidden",
					rounded: "md",
					border: "base",
					bg: "popover",
					color: "popover.foreground",
					shadow: "md",

					"&[data-state=open]": {
						animateIn: true,
						fadeIn: 0,
						zoomIn: 95,
					},

					"&[data-state=closed]": {
						animateOut: true,
						fadeOut: 0,
						zoomOut: 95,
					},

					"&[data-side=top]": {
						slideInFromBottom: "2",
					},

					"&[data-side=bottom]": {
						slideInFromTop: "2",
					},

					"&[data-side=left]": {
						slideInFromRight: "2",
					},

					"&[data-side=right]": {
						slideInFromLeft: "2",
					},

					"&[data-position=popper]": {
						"&[data-side=top]": {
							translateY: "-1",
						},

						"&[data-side=bottom]": {
							translateY: "1",
						},

						"&[data-side=left]": {
							translateX: "-1",
						},

						"&[data-side=right]": {
							translateX: "1",
						},
					},
				})}
			>
				<SelectPrimitive.Viewport
					data-position={position}
					className={css({
						p: "1",
						"&[data-position=popper]": {
							h: "var(--radix-select-trigger-height)",
							w: "full",
							minW: "var(--radix-select-trigger-width)",
						},
					})}
				>
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
};

const SelectItem = ({ value, children }: any) => {
	return (
		<SelectPrimitive.Item
			value={value}
			className={css({
				position: "relative",
				display: "flex",
				cursor: "default",
				userSelect: "none",
				alignItems: "center",
				rounded: "sm",
				py: "1.5",
				pl: "8",
				pr: "2",
				textStyle: "sm",
				outline: "2px solid transparent",

				_focus: {
					bg: "accent",
					color: "accent.foreground",
				},

				"&[data-disabled]": {
					pointerEvents: "none",
					opacity: "0.5",
				},
			})}
		>
			<SelectPrimitive.ItemIndicator
				className={css({
					position: "absolute",
					left: "2",
					display: "flex",
					h: "3.5",
					w: "3.5",
					alignItems: "center",
					justifyContent: "center",
				})}
			>
				<RxCheck
					className={css({
						h: "4",
						w: "4",
					})}
				/>
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
};

import { z } from "zod";

export const customErrorMap: z.ZodErrorMap = (err, ctx) => {
	if (err.code === z.ZodIssueCode.invalid_type) {
		if (err.received === "undefined") {
			return { message: "This field is required." };
		}
	}

	return { message: ctx.defaultError };
};

export const validationSetup = () => {
	z.setErrorMap(customErrorMap);
};

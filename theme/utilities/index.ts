import type { Config } from "@pandacss/types";
import { space } from "./space";

export const utilities: Config["utilities"] = {
	extend: {
		...space,
	},
};

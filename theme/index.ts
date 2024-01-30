import pandaPreset from "@pandacss/preset-panda";
import type { Config } from "@pandacss/types";
import { breakpoints } from "./breakpoints";
import { globalCss } from "./global";
import { recipes } from "./recipes";
import { semanticTokens } from "./semantic-tokens";
import { textStyles } from "./text-styles";
import { tokens } from "./tokens";
import { utilities } from "./utilities";

const defineConfig = <T extends Config>(config: T) => config;

export const definePreset = defineConfig({
	presets: [pandaPreset],
	globalCss,
	utilities,
	theme: {
		extend: {
			tokens,
			semanticTokens,
			breakpoints,
			textStyles,
			recipes,
		},
	},
});

export default definePreset;

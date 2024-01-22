import dayjs from "dayjs";
import("dayjs/locale/en-sg");
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const localeSetup = () => {
	dayjs.extend(localizedFormat, duration);
	dayjs.locale("en-sg");
};

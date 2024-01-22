import { FileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";

export const Route = new FileRoute("/").createRoute({
	component: Home,
});

function Home() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<p>Date: {dayjs().format("ll, LT A")}</p>
			<p>Locale: {dayjs.locale()}</p>
			<p>API URL: {import.meta.env.VITE_API_BASE_URL}</p>
		</div>
	);
}

import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { localeSetup } from "../utils/locale";
import { validationSetup } from "../utils/validation";

export const Route = new RootRoute({
	component: Root,
});

function Root() {
	localeSetup();
	validationSetup();

	return (
		<>
			<div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/settings" className="[&.active]:font-bold">
					Settings
				</Link>{" "}
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}

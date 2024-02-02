// This file is auto-generated by TanStack Router

import { FileRoute, lazyRouteComponent } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as IndexImport } from "./routes/index";

// Create Virtual Routes

const SettingsComponentImport = new FileRoute("/settings").createRoute();
const AdminComponentImport = new FileRoute("/admin").createRoute();
const AboutComponentImport = new FileRoute("/about").createRoute();

// Create/Update Routes

const SettingsComponentRoute = SettingsComponentImport.update({
	path: "/settings",
	getParentRoute: () => rootRoute,
} as any).update({
	component: lazyRouteComponent(
		() => import("./routes/settings.component"),
		"component",
	),
});

const AdminComponentRoute = AdminComponentImport.update({
	path: "/admin",
	getParentRoute: () => rootRoute,
} as any).update({
	component: lazyRouteComponent(
		() => import("./routes/admin.component"),
		"component",
	),
});

const AboutComponentRoute = AboutComponentImport.update({
	path: "/about",
	getParentRoute: () => rootRoute,
} as any).update({
	component: lazyRouteComponent(
		() => import("./routes/about.component"),
		"component",
	),
});

const IndexRoute = IndexImport.update({
	path: "/",
	getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/": {
			preLoaderRoute: typeof IndexImport;
			parentRoute: typeof rootRoute;
		};
		"/about": {
			preLoaderRoute: typeof AboutComponentImport;
			parentRoute: typeof rootRoute;
		};
		"/admin": {
			preLoaderRoute: typeof AdminComponentImport;
			parentRoute: typeof rootRoute;
		};
		"/settings": {
			preLoaderRoute: typeof SettingsComponentImport;
			parentRoute: typeof rootRoute;
		};
	}
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
	IndexRoute,
	AboutComponentRoute,
	AdminComponentRoute,
	SettingsComponentRoute,
]);

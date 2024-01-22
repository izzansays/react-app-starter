import Avatar from "@/components/Avatar";
import { nricSchema } from "@/utils/validation";
import {
	QueryClient,
	queryOptions,
	useSuspenseQuery,
} from "@tanstack/react-query";
import {
	Await,
	FileRoute,
	defer,
	useAwaited,
	useLoaderData,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import Loading from "../components/Loading";
import { apiClient } from "../utils/api";

const postsQueryOptions = queryOptions({
	queryKey: ["posts"],
	queryFn: async () => {
		return await new Promise((r) => setTimeout(r, 1000))
			.then(() => apiClient.get("https://pokeapi.co/api/v2/pokemon"))
			.then((r) => r.data);
	},
});

export const Route = new FileRoute("/").createRoute({
	component: Home,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
	pendingComponent: Loading,
});

function Home() {
	// const pokemonQuery = useSuspenseQuery(postsQueryOptions)
	// const pokemon = pokemonQuery.data.results

	const pokemon = Route.useLoaderData({ select: (data) => data.results });
	// const data = useAwaited()

	// console.log(pokemonQuery)

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<p>Date: {dayjs().locale("en-sg").format("ll, LT A")}</p>
			<p>Locale: {dayjs.locale()}</p>
			<p>API URL: {import.meta.env.VITE_API_BASE_URL}</p>
			{pokemon?.map((val) => (
				<p key={val.name}>{val.name}</p>
			))}
			{/* <Await promise={deferredPromise}>
				<p> test</p> */}

			{/* </Await> */}

			{/* <p>{nricSchema.parse("sss")}</p> */}
			{/* <Avatar alt="PJ Harvey" /> */}
		</div>
	);
}

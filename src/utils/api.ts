import {
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(
	(config) => {
		if (config.url?.includes("https")) {
			//do not use baseURL for requests to external APIs
			config.baseURL = "";
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// export const useFetch = <T>(
//   url: string | null,
//   params?: AxiosRequestConfig,
//   config?: UseQueryOptions<T, Error, T, QueryKeyT>
// ) => {
//   const context = useQuery({
//     queryKey: [url!, params],
//     queryFn: () =>
//       apiClient
//         .get(url!, params)
//         .then((res) => res.data)
//         .catch((error) => {
//           return Promise.reject(error);
//         }),
//   });

//   return context;
// };

// const useGenericMutation = <T, S>(
//   func: (data: S) => Promise<AxiosResponse<S>>,
//   url: string,
//   params?: object,
//   updater?: ((oldData: T, newData: S) => T) | undefined
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation<AxiosResponse, AxiosError, S>(func, {
//     onMutate: async (data) => {
//       await queryClient.cancelQueries([url!, params]);

//       const previousData = queryClient.getQueryData([url!, params]);

//       queryClient.setQueryData<T>([url!, params], (oldData) => {
//         return updater ? (oldData!, data) : data;
//       });

//       return previousData;
//     },
//     // If the mutation fails, use the context returned from onMutate to roll back
//     onError: (err, _, context) => {
//       queryClient.setQueryData([url!, params], context);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries([url!, params]);
//     },
//   });
// };

// export const usePost = <T, S>(
//   url: string,
//   params?: object,
//   updater?: (oldData: T, newData: S) => T
// ) => {
//   return useGenericMutation<T, S>(
//     (data) => apiClient.post<S>(url, data),
//     url,
//     params,
//     updater
//   );
// };

// export const useUpdate = <T, S>(
//   url: string,
//   params?: object,
//   updater?: (oldData: T, newData: S) => T
// ) => {
//   return useGenericMutation<T, S>(
//     (data) => apiClient.patch<S>(url, data),
//     url,
//     params,
//     updater
//   );
// };

// export const useDelete = <T>(
//   url: string,
//   params?: object,
//   updater?: (oldData: T, id: string | number) => T
// ) => {
//   return useGenericMutation<T, string | number>(
//     (id) => apiClient.delete(`${url}/${id}`),
//     url,
//     params,
//     updater
//   );
// };

export const downloadFileRequest = (
	method: "GET" | "POST",
	endpoint: string,
	body?: object,
) => {
	const downloadFile = (response: AxiosResponse) => {
		const filename = response.headers
			.get("content-disposition")
			.split("filename=")[1];

		const blob = new Blob([response.data], {
			type: response.type || "application/octet-stream",
		});

		const blobURL = window.URL.createObjectURL(blob);
		const tempLink = document.createElement("a");
		tempLink.style.display = "none";
		tempLink.href = blobURL;
		tempLink.setAttribute("download", filename);

		//Safari workaround
		if (typeof tempLink.download === "undefined") {
			tempLink.setAttribute("target", "_blank");
		}

		document.body.appendChild(tempLink);
		tempLink.click();
		document.body.removeChild(tempLink);
		setTimeout(() => {
			window.URL.revokeObjectURL(blobURL);
		}, 100);
	};

	if (method === "GET") {
		apiClient.get(endpoint, { responseType: "blob" }).then((response) => {
			downloadFile(response);
		});
	} else {
		apiClient
			.post(endpoint, body, { responseType: "blob" })
			.then((response) => {
				downloadFile(response);
			});
	}
};

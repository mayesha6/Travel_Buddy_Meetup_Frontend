
import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "@/services/auth/tokenHandler";


const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1" || "https://travel-buddy-and-meetup-backend.vercel.app/api/v1";


// const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
//     const { headers, body, ...restOptions } = options;

//     const accessToken = await getCookie("accessToken");

//     if (endpoint !== "/auth/refresh-token") {
//         await getNewAccessToken();
//     }

//     const isFormData = body instanceof FormData;

//     return fetch(`${BACKEND_API_URL}${endpoint}`, {
//         method: restOptions.method,
//         body,
//         headers: isFormData
//             ? {
//                   Cookie: accessToken ? `accessToken=${accessToken}` : "",
//               }
//             : {
//                   "Content-Type": "application/json",
//                   Cookie: accessToken ? `accessToken=${accessToken}` : "",
//                   ...headers,
//               },
//         credentials: "include",
//         ...restOptions,
//     });
// };


const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, body, ...restOptions } = options;

    if (endpoint !== "/auth/refresh-token") {
        await getNewAccessToken();
    }

    const accessToken = await getCookie("accessToken");
    const isFormData = body instanceof FormData;

    return fetch(`${BACKEND_API_URL}${endpoint}`, {
        method: restOptions.method,
        body,
        headers: isFormData
            ? {
                  ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // Use Authorization header instead
              }
            : {
                  "Content-Type": "application/json",
                  ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
                  ...headers,
              },
        credentials: "include", // This tells browser to send cookies
        ...restOptions,
    });
};

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),

}



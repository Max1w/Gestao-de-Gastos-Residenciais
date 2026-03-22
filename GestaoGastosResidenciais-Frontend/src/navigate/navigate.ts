import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5209/api",
  withCredentials: true,
});

export const Navegador = {
    
    get: async <T>( url: string, params?: Record<string, any>, headers?: Record<string, string>
    ): Promise<T> => {
        const config: AxiosRequestConfig = { params, headers, };

        const response = await api.get<T>(url, config);
        return response.data;
    },

    post: async <T>( url: string, body: any, headers?: Record<string, string>
    ): Promise<T> => {
        const config: AxiosRequestConfig = { headers: headers ||{ "Content-Type": "application/json" }, }

        const response = await api.post<T>(url, body, config);
        return response.data;
    },

    put: async <T>( url: string, body: any, headers?: Record<string, string>
    ): Promise<T> => {
        const config: AxiosRequestConfig = { headers: headers || { "Content-Type": "application/json" }, };

        const response = await api.put<T>(url, body, config);
        return response.data;
    },

    delete: async <T>( url: string, headers?: Record<string, string>
    ): Promise<T> => {
        const config: AxiosRequestConfig = { headers, };

        const response = await api.delete<T>(url, config);
        return response.data;
    },

}
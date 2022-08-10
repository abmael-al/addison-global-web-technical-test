import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

async function fetch<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await axios.get<T>(url, config);

    return response;
}

export { fetch };
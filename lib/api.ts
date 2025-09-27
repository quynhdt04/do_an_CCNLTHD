import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiUpload = async <T>(url: string, formData: FormData): Promise<T> => {
    const res = await axios.post<T>(`/api${url}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

export const apiGet = async <T>(url: string, params?: object): Promise<T> => {
    const res = await api.get<T>(url, { params });
    return res.data;
};

export const apiPost = async <T>(url: string, data?: object): Promise<T> => {
    const res = await api.post<T>(url, data);
    return res.data;
};

export const apiPatch = async <T>(url: string, data?: object): Promise<T> => {
    const res = await api.patch<T>(url, data);
    return res.data;
};

export const apiDelete = async <T>(url: string): Promise<T> => {
    const res = await api.delete<T>(url);
    return res.data;
};

import apiClient from "./apiClient.js";

export const fetchKey = async (reserveId) => {
    try {
        const response  = await apiClient.get(`keys/${reserveId}`);
        return response.data;
    }catch(err) {
        console.error("key fetch error" + err);
    }
}

export const updateKey = async (reserveId) => {
    try {
        const response  = await apiClient.post(`keys/${reserveId}` );
        return response.data;
    }catch(err) {
        console.error("key update error" + err);
    }
}

export const deleteKey = async (reserveId) => {
    try {
        const response  = await apiClient.delete(`keys/${reserveId}`);
        return response.data;
    }catch(err) {
        console.error("key update error" + err);
    }
}
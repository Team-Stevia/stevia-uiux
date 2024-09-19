import apiClient from "./apiClient.js";

export const fetchKey = async (reserveId) => {
    try {
        const response  = await apiClient.get(`keys/${reserveId}`);
        return response;
    }catch(err) {
        console.error("key fetch error" + err);
    }
}

export const updateKey = async () => {
    try {
        const response  = await apiClient.post(`keys/${reserveId}` );
        return response;
    }catch(err) {
        console.error("key update error" + err);
    }
}

export const deleteKey = async () => {
    try {
        const response  = await apiClient.delete(`keys/${reserveId}`);
        return response;
    }catch(err) {
        console.error("key update error" + err);
    }
}
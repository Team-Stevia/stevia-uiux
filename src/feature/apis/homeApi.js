import apiClient from "./apiClient.js";

export const fetchBoardData = async () => {
    try {
        const response = await apiClient.get("/boards");
        return response.data[0];
    } catch {
        console.error('Failed to fetch boards');
        throw error;
    }
}

export const updateBoardData = async (buildingLocation) => {
    try {
        const response = await apiClient.get(`/boards/${buildingLocation}`);
        return response;
    } catch (error) {
        console.error('Error updating board', error);
        throw error;
    }
}
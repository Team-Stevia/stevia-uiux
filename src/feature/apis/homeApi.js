import apiClient from "./apiClient.js";

/**
 * 게시판 데이터를 가져오는 함수
 * @GET /boards
 * @return {Object} buildingAndRoomList,otherBuildingList,reservationInfo
 */
export const fetchBoardData = async () => {
    try {
        const response = await apiClient.get("/boards");
        return response.data[0];
    } catch {
        console.error('Failed to fetch boards');
        throw error;
    }
}

/**
 * 특정 빌딩에 대한 게시판 데이터를 업데이트(또는 가져오기)하는 함수
 * @GET /boards/{buildingLocation}
 * @param {string} buildingLocation - 빌딩 위치 정보
 * @return {Object} 해당 빌딩 roomList
 */
export const updateBoardData = async (buildingLocation) => {
    try {
        const response = await apiClient.get(`/boards/${buildingLocation}`);
        return response;
    } catch (error) {
        console.error('Error updating board', error);
        throw error;
    }
}
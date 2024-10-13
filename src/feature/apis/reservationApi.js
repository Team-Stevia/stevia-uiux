import apiClient from "./apiClient.js";

export const fetchReserveData = async (roomId) => {
    try {
        const response = await apiClient.get(`timetables/${roomId}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch reserve data', err);
    }
}

export const postReserveData = async (roomId, usageTime) => {
    console.log(roomId);
    console.log(typeof usageTime);
    console.log("apiCient"+  apiClient);  // apiClient가 제대로 정의되었는지 확인


    try {
        const response = await apiClient.post(`boards/reservation/${roomId}`, {
                usageTime:usageTime
            }, {
                headers: {
                    "Content-Type": "application/json",  // Content-Type 명시
                }
            }
        );
        console.log("응답" + response.data);
        console.log(response.data.reserveId);
        return response.data;
    } catch (err) {
        console.error('Failed to post reservation', err);
    }
}
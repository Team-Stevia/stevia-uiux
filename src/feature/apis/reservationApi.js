import apiClient from "./apiClient.js";

/**
 * 특정 roomId에 대한 강의실 정보 조회 함수
 * @GET /timetables/{roomId}
 * @param {string} roomId - 예약할 방의 ID
 * @returns roomId의 강의실 정보
 */
export const fetchReserveData = async (roomId) => {
    try {
        const response = await apiClient.get(`timetables/${roomId}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch reserve data', err);
    }
}

/**
 * 특정 roomId에 대한 예약 데이터를 생성하는 함수
 * @POST /boards/reservation/{roomId}
 * @param {string} roomId - 예약할 방의 ID
 * @param {String} usageTime - 사용 시간
 * @returns 예약 ID(reserveId)
 */
export const postReserveData = async (roomId, usageTime) => {
    try {
        const response = await apiClient.post(`boards/reservation/${roomId}`, {
                usageTime: usageTime
            }, {
                headers: {
                    "Content-Type": "application/json",  // Content-Type 명시
                }
            }
        );
        return response.data;
    } catch (err) {
        console.error('Failed to post reservation', err);
    }
}
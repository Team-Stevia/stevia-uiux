import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000',
});

//로그인 요청
export const loginUser = async ({studentId, password}) => {
    try {
        //테스트용 json-server 사용시 /api 경로 제거
        const response = await apiClient.post('api/users/signin', {studentId, password});
        return response.data;
    } catch (error) {
        throw new Error('Failed to login');
    }
};
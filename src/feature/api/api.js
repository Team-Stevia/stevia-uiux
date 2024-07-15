import axios from 'axios';
import { useCookies } from 'react-cookie';

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

//액세스 토큰 재발급
export const refreshAccessToken = async dispatch => {
    try {
        const [cookies] = useCookies(['refreshToken']);
        const refreshToken = cookies.refreshToken;
        const response = await apiClient.post('/auth/token/access', {token: refreshToken});
        const {accessToken} = response.data;

        return accessToken; // 액세스 토큰 반환
    } catch (error) {
        console.log('Failed to refresh access token', error);
        throw error;
    }
};

//게시판 데이터 요청
export const fetchBoards = async (accessToken) => {
    try {

        //액세스 토큰 만료시 재발급 요청
        if (!accessToken) {
            await refreshAccessToken();
        }
    //테스트용 json-server 사용시 /api 경로 제거
        const response = await apiClient.get('api/boards', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch boards');
    }
};
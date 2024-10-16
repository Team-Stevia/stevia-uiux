import {useCookies} from 'react-cookie';
import Axios from "axios";


const apiClient = Axios.create({
        baseURL: 'http://192.168.30.63:3001'
    }
);

/**
 * 사용자의 studentId와 password를 이용하여 로그인 요청을 보내는 함수
 * @POST /users
 * @param {Object} params - 로그인 정보 객체
 * @param {string} params.studentId - 학생 ID
 * @param {string} params.password - 비밀번호
 * @return {Object} AccessToken,RefreshToken
 */
export const loginUser = async ({studentId, password}) => {
    try {
        const response = await apiClient.post('/users', {studentId, password});
        return response.data;
    } catch (error) {
        throw new Error('Failed to login');
    }
};

/**
 * 저장된 refreshToken을 이용하여 엑세스 토큰 재발급 하는 함수
 * @POST /auth/token/access
 * @return new accessToken
 */
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

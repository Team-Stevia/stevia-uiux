import Axios from 'axios';
import store from "../../app/store.js";
import {refreshAccessToken} from "./loginApi.js";

// Axios 인스턴스 생성
const apiClient = Axios.create({
    baseURL: 'http://localhost:3003',
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
    async (config) => {
        let accessToken = store.getState().auth.accessToken;

        if (!accessToken) {
            accessToken = await refreshAccessToken();  // 액세스 토큰을 갱신
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
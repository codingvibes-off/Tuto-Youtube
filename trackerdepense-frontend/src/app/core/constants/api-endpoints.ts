import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

const USER_BASE = `${API_BASE_URL}/api/user`;
const EXPENSE_BASE = `${API_BASE_URL}/api/expense`;
const CATEGORY_BASE = `${API_BASE_URL}/api/category`;

export const API_ENDPOINTS = {
    USER: {
        LOGIN: `${USER_BASE}/login`,
        REGISTER: `${USER_BASE}/register`,
        LOGOUT: `${USER_BASE}/logout`,
        UPDATE: (id: string | number) => `${USER_BASE}/${id}`,
    },
    EXPENSE: {
        GET_ALL: `${EXPENSE_BASE}`,
        GET_BY_ID: (id: string | number) => `${EXPENSE_BASE}/${id}`, 
        CREATE: `${EXPENSE_BASE}`,
        UPDATE: (id: string | number) => `${EXPENSE_BASE}/${id}`, 
        DELETE: (id: string | number) => `${EXPENSE_BASE}/${id}`
    },
    CATEGORY: {
        GET_ALL: `${CATEGORY_BASE}`,
        GET_BY_ID: (id: string | number) => `${CATEGORY_BASE}/${id}`,
        CREATE: `${CATEGORY_BASE}`,
        UPDATE: (id: string | number) => `${CATEGORY_BASE}/${id}`,
        DELETE: (id: string | number) => `${CATEGORY_BASE}/${id}`,
    },
};

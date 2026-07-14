import AsyncStorage from "@react-native-async-storage/async-storage";

let baseURL = 'http://127.0.0.1';
let authToken = '';

async function loadApiClient() {
    const storedURL = await AsyncStorage.getItem('serverAddress');
    const storedToken = await AsyncStorage.getItem('authToken');
    if (storedURL) baseURL = storedURL;
    if (storedToken) authToken = storedToken;
    console.log('[API] Loaded baseURL:', baseURL, 'token:', !!authToken);
}

function getBaseURL() { return baseURL; }
function getAuthToken() { return authToken; }

export async function apiRequest(endpoint, method = 'GET', body = null) {
    if (!baseURL || !authToken) {
        await loadApiClient();
    }

    const url = getBaseURL() + endpoint;
    const token = getAuthToken();

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка ${response.status}: ${errorText}`);
        }
        if (response.status === 204) return null;
            return response.json();
    } catch (error) {
        console.error('[API] Request failed:', error.message);
        throw error;
    }
}

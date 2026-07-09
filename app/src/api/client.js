const BASE_URL = process.env.API_URL || 'http://127.0.0.1:8080';

export async function apiRequest(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };

    if (body) options.body = JSON.stringify(body);
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    if (response.status === 204) return null;
    return response.json();
}

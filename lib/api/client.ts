const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}
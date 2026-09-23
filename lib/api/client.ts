const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function debugApi(label: string, value: unknown) {
    if (process.env.NODE_ENV === "production") {
        return;
    }

    console.log(`[API] ${label}`, value);
}

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const startedAt = Date.now();

    debugApi("request", `${options?.method ?? "GET"} ${url}`);

    const response = await fetch(url, options);
    const duration = Date.now() - startedAt;

    debugApi("response", `${response.status} ${response.statusText} ${url} (${duration}ms)`);

    if (!response.ok) {
        const text = await response.text();
        debugApi("error body", text);
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        debugApi("payload", data.slice(0, 5));
    } else if (data && typeof data === "object") {
        debugApi("payload", data);
    }

    return data;
}
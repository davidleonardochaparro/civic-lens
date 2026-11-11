import { useState } from 'react';

type APIRes = {
    message: string;
}

type APIPostReturn = {
    apiCall: <T>(method: string, endpoint: string, headers: Headers, body?: object) => Promise<T>;
    loading: boolean | null;
    err: boolean | null | unknown;
}

export const useAPI = (): APIPostReturn => {
    const [loading, setLoading] = useState<boolean | null>(null);
    const [err, setErr] = useState<boolean | null | unknown>(null)

    const apiCall = async <T>(method: string, endpoint: string, headers: Headers, body?: object): Promise<T> => {
        setLoading(true);
        setErr(null);

        try {
            
            if (body) {

                const res: Response = await fetch(`http://127.0.0.1:4000/${endpoint}`, {
                    method: method,
                    headers,
                    body: JSON.stringify(body)
                });
                const data: APIRes = await res.json();
    
                if (!res.ok) throw new Error(data.message || "Request failed");
    
                return data as T;

            }

            const res: Response = await fetch(`http://127.0.0.1:4000/${endpoint}`, {
                method: method,
                headers
            });
            const data: APIRes = await res.json();

            if (!res.ok) throw new Error(data.message || "Request failed");

            return data as T;

        } catch (err) {
            setErr(err instanceof Error ? err.message: 'Unknown error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { apiCall, loading, err}
}
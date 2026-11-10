import { useState } from "react";

type APIRes = {
    message: string;
}

type APIPostReturn = {
    post: <T>(endpoint: string, body: object, headers: Headers) => Promise<T>;
    loading: boolean | null;
    error: boolean | null | unknown;
}

export const useAPIPost = ():APIPostReturn => {

    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<boolean | null | unknown>(null);
    
    const post = async <T>(endpoint: string, body: object, headers: Headers): Promise<T> => {
        setLoading(true);
        setError(null);

        try {
            const res: Response = await fetch(`http://127.0.0.1:4000/${endpoint}`, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            });
            const data: APIRes = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || "Request failed");
            }

            return data as T;
        } catch (error) {            
            setError(
                error instanceof Error ? error.message: 'Unknown error occurred'
            );
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { post, loading, error };
}
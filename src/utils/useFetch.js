import { useState, useEffect, useCallback } from 'react'
import { getBackendURL } from './backendAPI';

const API = getBackendURL()

function useFetch(url, method, options) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API}${url}`, {
                method: method || "GET",
                headers: {
                    'Content-type': 'application/json',
                },
                ...options,
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error(`HTTP Error! Status :${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setData(result.data)
            } else {
                setError(result.message)
            }
        } catch (error) {
            console.log(error);
            setError(error.message || "Failed fatch data");
        } finally {
            setLoading(false)
        }
    }, [url, method, options])

    useEffect(() => {
        fetchData()
    }, [fetchData]);
    return { data, error, loading, refetch: fetchData, setData, setError, setLoading };
}

export default useFetch;


/* 

async function getData() {
            setLoading(true)
            try {
                const response = await fetch(`${API}${url}`, {
                    method: method || "GET",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.success) {
                    setData(result.data)
                } else {
                    setError(result.message)
                }
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getData()

*/
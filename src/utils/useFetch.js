import { useState, useEffect } from 'react'
import { getBackendURL } from './backendAPI';

const API = getBackendURL()

function useFetch(url, method, options) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
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
    }, [url]);
    return { data, error, loading };
}

export default useFetch;
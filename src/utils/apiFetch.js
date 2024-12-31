import { toast } from "react-toastify";
import { getBackendURL } from "./backendAPI"

const api = getBackendURL()
 
async function fetchAPI(url,method, options) {
    try {
        const response = await fetch(`${api}${url}`, {
            method: method || "GET",
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error("Fetch Failed, HTTP error!");
        }

        const result = await response.json();
        if (!result.success) {
            toast.error(result.message || "Failed Fetch");
        }

        return { result }

    } catch (error) {
        console.log(error)
            toast.error(result.message || "Failed Fetch");
    }
}


export default fetchAPI
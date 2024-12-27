
export const getBackendURL = () => {
    const productionAPI = String(import.meta.env.VITE_BACKEND_URL)
    const PRODUCTION = Number(import.meta.env.VITE_PRODUCTION)
    const localhost = 'http://localhost:3001'

    if (PRODUCTION == 1) {
        return productionAPI
    } else {
        return localhost
    }
}
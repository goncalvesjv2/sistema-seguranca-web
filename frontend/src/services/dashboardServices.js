import { getToken } from "./sessionService";

export async function getDashboard() {
    try {
        const token = getToken();
        const response = await fetch('https://localhost:3000/api/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        return {
            error: error.message
        }
    }
}
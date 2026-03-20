
const API_URL = 'http://10.103.1.238:8000'

export async function saveWalkPoint(walkId: number, latitude: number, longitude: number) {
    try {
        const response = await fetch(`${API_URL}/walks/${walkId}/add_point/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "latitude": latitude,
                "longitude": longitude
            })
        });
        return response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}

export async function getWalkPoints(walkId: number) {
    try {
        const response = await fetch(`${API_URL}/walk/${walkId}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        const walk = await response.json();
        return walk.points
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    }

}
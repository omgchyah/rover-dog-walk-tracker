const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://rover-dog-walk-tracker-production.up.railway.app';

export async function saveWalkPoint(walkId: number, latitude: number, longitude: number) {
    try {
        const response = await fetch(`${BASE_URL}/walks/${walkId}/add_point/`, {
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
        const response = await fetch(`${BASE_URL}/walk/${walkId}/`, {
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
export async function getPlaces() {
    try {
        const response = await fetch(`${BASE_URL}/places/`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        const places = await response.json();
        return places;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}
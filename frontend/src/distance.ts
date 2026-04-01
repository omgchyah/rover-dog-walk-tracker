import useLocation from "hooks/useLocation";

const { route } = useLocation();

const distance = ((route: { latitude: number, longitude: number }[]) => {
    const R = 6371;
    if (route.length < 2) return 0;

    const toRad = (degrees: number) => (degrees * Math.PI / 180);
    let total = 0;

    for (let i = 1; i < route.length; i++) {
        const p1 = route[i -1];
        const p2 = route[i]

        const dLat = toRad(p2.latitude - p1.latitude);
        const dLon = toRad(p2.longitude - p1.longitude);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(p1.latitude)) * Math.cos(toRad(p2.latitude)) * Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        total += R * c;
    }
    return total;
});

export default distance;
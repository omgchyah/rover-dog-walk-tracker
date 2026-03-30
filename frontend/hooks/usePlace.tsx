import { useEffect, useState } from "react"
import { Place } from '../types/place'
import { getPlaces } from "services/api";

const usePlace = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            const places = await getPlaces();
            setPlaces(places);
            setIsLoading(false);
        };
        fetchPlaces();
    }, []);



    return {
        places,
        setPlaces,
        isLoading
    }
}

export default usePlace;

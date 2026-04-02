import { useEffect, useState } from "react"
import { Place } from '../../src/types/place'
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

    const addPlaceLocally = (newPlace: Place) => {
        setPlaces((prev) => [...prev, newPlace]);
    }



    return {
        places,
        setPlaces,
        isLoading,
        addPlaceLocally
    }
}

export default usePlace;

import { useState } from "react";
import { Place } from "@/types/place";

const usePlaceDetail = () => {
    const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    const handleMarkerPress = (place: Place) => {
            setSelectedPlace(place);
            setIsDetailVisible(true);
    }


    const handleCloseModal = () => {
        setSelectedPlace(null);
        setIsDetailVisible(false);
    }

    return {
        isDetailVisible,
        handleMarkerPress,
        selectedPlace,
        handleCloseModal

    }
}

export default usePlaceDetail;
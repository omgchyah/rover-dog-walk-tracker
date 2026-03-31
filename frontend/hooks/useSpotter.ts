import { useState } from 'react'
import { Coordinate } from 'types/location'

const useSpotter = () => {
    const [tempCoordinate, setTempCoordinate] = useState<Coordinate | null>(null);
    const [isSheetVisible, setIsSheetVisible] = useState<boolean>(false);

    const handleMapLongPress = (coordinates: Coordinate) => {
        setIsSheetVisible(true);
        setTempCoordinate(coordinates);
    };

    const handleCancel = () => {
        setTempCoordinate(null);
        setIsSheetVisible(false);
    }

    return {
        tempCoordinate,
        isSheetVisible,
        handleMapLongPress,
        handleCancel
    }
}

export default useSpotter;

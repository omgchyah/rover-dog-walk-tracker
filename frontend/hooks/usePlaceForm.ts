import { useState } from "react"
import { Coordinate } from "types/location";
import { Place, Category } from "types/place";



const usePlaceForm = (tempCoordinate: Coordinate) => {
    const [formData, setFormData] = useState<Place>({
        name: '',
        description: '',
        category: Category.BUSINESS,
        latitude: tempCoordinate.latitude,
        longitude: tempCoordinate.longitude,
        allows_unleashed: false,
        requires_entry_fee: false,
        is_enclosed: false,
    });

    const updateField = (key: keyof Place, newValue: string | boolean | number | Category) => {
        setFormData((prev) => {
            return {...prev,
            [key]: newValue}
        });

    }

    return {
        formData,
        setFormData,
        updateField
    }

}

export default usePlaceForm;
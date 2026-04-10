import { useState } from "react"
import { Coordinate } from "@/types/location";
import { Place, Category } from "@/types/place";
import { postPlace } from "../../services/api";

interface FormErrors {
    [fieldname: string]: string;
}

interface usePlaceFormInterface {
    tempCoordinate: Coordinate;
    onSuccess?: (place: Place) => void;
}

const usePlaceForm = (
    {tempCoordinate,
    onSuccess}:
    usePlaceFormInterface
) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Place>({
        name: '',
        description: '',
        category: Category.BUSINESS,
        latitude: Number(tempCoordinate.latitude.toFixed(6)),
        longitude: Number(tempCoordinate.longitude.toFixed(6)),
        allows_unleashed: false,
        requires_entry_fee: false,
        is_enclosed: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const updateField = (key: keyof Place, newValue: string | boolean | number | Category) => {
        setFormData((prev) => {
            return {...prev,
            [key]: newValue}
        });

    }

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});
        console.log("4. API Call Triggered");

        try {
            const response = await postPlace(formData);
            console.log("5. API Success:", response);
            if (onSuccess) {
                onSuccess(response);
            }
        } catch (error) {
            console.error("5. API Error:", error);
            setErrors({
                submit: error instanceof Error ? error.message : 'Failed to save new spot.'
            })
        } finally {
            setLoading(false);
        }
    }

    const handleValidation = () => {
        console.log("1. Validation Started", formData);
        const formErrors: FormErrors = {};

        if (!formData.name || formData.name.length > 100) {
            formErrors['name'] = "Name length must be shorter than 100 characters";
        }
        if (formData.description.length > 150) {
            formErrors['description'] = "Description length must be shorter than 150 caracters";
        }
        if (!formData.category) {
            formErrors['category'] = "A category must be selected";
        }

        setErrors(formErrors);
        console.log("2. Errors found:", formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log("3. Passing to Submit...");
            handleSubmit();
        }

    }

    return {
        formData,
        setFormData,
        updateField,
        handleValidation,
        loading,
        errors
    }

}

export default usePlaceForm;
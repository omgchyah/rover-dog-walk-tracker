export interface Pet {
    id: number;
    name: string;
    owner_name: string;
    pet_type: "Dog" | "Cat";
    breed: string;
    is_social: boolean;
    is_pipican_allowed: boolean;
    image_url: string;
}
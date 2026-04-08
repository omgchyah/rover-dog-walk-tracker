export enum Category {
    LODGING = "Lodging",
        CAFE = "Cafe",
        RESTAURANT = "Restaurant",
        PARK = "Park",
        PIPI_CAN = "Pipí can",
        FUN = "Fun",
        BUSINESS = "Business",
        STORE = "Store",
}

export interface Review {
    id?: number;
    author_name?: string;
    title?: string;
    star?: 1 | 2 | 3 | 4 | 5;
    body?: string;
    note?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Place extends Review {
    id?: number;
    name: string;
    description: string;
    category: Category;
    latitude: Number;
    longitude: Number;
    allows_unleashed: boolean;
    requires_entry_fee: boolean;
    is_enclosed: boolean;
    created_at?: Date;
    updated_at?: Date;
    reviews?: Review;
    average_review?: number | null;
    review_count?: number;
}
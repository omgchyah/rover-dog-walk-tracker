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

export interface Place {
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
}
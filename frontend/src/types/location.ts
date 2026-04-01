export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Delta {
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface MapRegion extends Coordinate {
    latitudeDelta: number;
    longitudeDelta: number;
}
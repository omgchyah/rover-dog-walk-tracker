import { useEffect, useRef, useState } from "react";
import { Coordinate, Delta, MapRegion } from "types/location";
import MapView from "react-native-maps";

interface useWalkStatsInterface {
isTracking: boolean,
startTracking: () => void,
stopTracking: () => void,
route: Coordinate[],
initialLocation: MapRegion | null
}

const useWalkStats = (
{ isTracking, startTracking, stopTracking, route, initialLocation } : useWalkStatsInterface
) => {

const [currentDelta, setCurrentDelta] = useState<Delta>({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    });
    const [isFollowing, setIsFollowing] = useState<boolean>(true);
    const MapRef = useRef<MapView>(null);

    const target = route.length > 0 ? route[route.length - 1] : initialLocation;

    const handlePress = () => {
            if (isTracking) {
            stopTracking();
            } else {
            startTracking();
            }
            }

            useEffect(() => {
            if (target == null) return;

            if (route.length > 0 && MapRef.current) {
            const lastPoint = route[route.length - 1]

            if (isFollowing) {
            MapRef.current.animateToRegion({
            latitude: lastPoint.latitude,
            longitude: lastPoint.longitude,
            latitudeDelta: currentDelta.latitudeDelta,
            longitudeDelta: currentDelta.longitudeDelta,
            }, 1000)
            }
            }
            }, [route]);

            const handleRegionChange = (region: MapRegion) => {
            setCurrentDelta({
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
            })
            }

            const handleRecenter = () => {
            setIsFollowing(true);

            const target = route.length > 0 ? route[route.length - 1] : initialLocation;

            if (target && MapRef.current) {
            MapRef.current.animateToRegion({
            latitude: target.latitude,
            longitude: target.longitude,
            latitudeDelta: currentDelta.latitudeDelta,
            longitudeDelta: currentDelta.longitudeDelta,
            }, 1000);
            }
            };


            return {
            handlePress,
            isFollowing,
            setIsFollowing,
            currentDelta,
            setCurrentDelta,
            handleRegionChange,
            handleRecenter,
            MapRef
            }

            }

            export default useWalkStats;

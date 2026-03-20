import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getWalkPoints } from "services/api";
import * as Location from 'expo-location';


const useLocation = () => {
    //The Box state to save the coordinates
    const [route, setRoute] = useState<any[]>([]);
    const [isTracking, setIsTracking] = useState<boolean>(false);
    const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);
    const [initialLocation, setInitialLocation] = useState<any>(null);
    
    //This passes the long and lat to my array of points
    const handleNewRoute = (newPoint: Object) => {
        setRoute(prevRoute => [...prevRoute, newPoint])
    }

    useEffect(() => {
        const getInitialPos = async () => {

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});

                setInitialLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                });
            }
        };
        getInitialPos();
    }, []);
    
    //Once this start tracking, it will get the position every 5 meters and save them to the array and also the location subscription object to make it stop after the walk is done
    async function startTracking() {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission not granted!');
            return;
        }
            const options = {
                accuracy: Location.Accuracy.High,
                distanceInterval: 10
            }
            //This is going to track my route
            //Also this gives me data that looks like:
            /**
             * {
                "coords": {
                "latitude": 41.38,
                "longitude": 2.17,
                "altitude": 10,
                "accuracy": 5,
                "speed": 1.2
                },
                "timestamp": 1710000000
            }
             */
            const sub = await Location.watchPositionAsync(
                options,
                (data) => {
                    //I get only the lat and long from  the coords value and pass them to my callback function
                    const { latitude, longitude } = data.coords;
                    handleNewRoute({ latitude, longitude });
                });
            //I get the sub identifier
            setSubscription(sub);
            setIsTracking(prev => true);
        }

    async function stopTracking() {
        if (subscription) {
            subscription.remove();
            setSubscription(null);
        }
        setIsTracking(prev => false);
    }

    useEffect(() => {
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [subscription]);

    return {
        route,
        isTracking,
        startTracking,
        stopTracking,
        initialLocation
    }
}

export default useLocation;


const styles = StyleSheet.create({})
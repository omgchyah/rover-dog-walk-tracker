import useLocation from 'hooks/useLocation';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Delta, MapRegion } from 'types/location';

const API_URL = 'http://10.103.1.238:8000'

export default function HomeScreen() {
  const { route, isTracking, startTracking, stopTracking, initialLocation } = useLocation();
  const MapRef = useRef<MapView>(null);
  const [currentDelta, setCurrentDelta] = useState<Delta>({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  
  const handlePress = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  }

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
  
  useEffect(() => {
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
  
  
  if (!initialLocation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="hotpink" />
            <Text>Finding your location...</Text>
        </View>
    )

  }

  return (
    <View style={styles.mainContainer}>
      <Text>
        Points collected: {route.length}
      </Text>
      <Button
      title={isTracking ? 'Pause Walk' : 'Start Walk'}
      onPress={handlePress}>
      </Button>
      <MapView
      onPanDrag={() => setIsFollowing(false)}
      ref={MapRef}
      style={styles.mapContainer}
      initialRegion={initialLocation}
      onRegionChangeComplete={(handleRegionChange)}
      >
        {route.length > 0 && (
          <>
            <Polyline
            coordinates={route}
            strokeWidth={5}
            strokeColor='green'
            />
            <Marker
            coordinate={route[0]}
            />
          </>
        )}
      </MapView>
      <View style={styles.buttonOverlay}>
        <Button
        title='Center'
        onPress={handleRecenter}
        color='green'
        />
      </View>
    </View>
  );
  
}
const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 42,    
  },
  mapContainer: {
    width: '100%',
    height: '80%',
  },
  buttonOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  }
});

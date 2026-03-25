import useLocation from 'hooks/useLocation';
import useMapController from 'hooks/useMapController';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

const API_URL = 'http://10.103.1.238:8000'

export default function HomeScreen() {
  const { route, isTracking, startTracking, stopTracking, initialLocation } = useLocation();

  const { handlePress, setIsFollowing, handleRegionChange, handleRecenter, MapRef } = useMapController({isTracking, startTracking, stopTracking, route, initialLocation});
  
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


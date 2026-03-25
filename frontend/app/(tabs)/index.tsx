import AppButton from 'app/components/atoms/AppButton';
import useLocation from '../../hooks/useLocation'
import useMapController from '../../hooks/useMapController';
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import LoadingScreen from 'app/components/atoms/LoadingScreen';

const API_URL = 'http://10.103.1.238:8000'

export default function HomeScreen() {
  const { route, isTracking, startTracking, stopTracking, initialLocation } = useLocation();

  const { handlePress, setIsFollowing, handleRegionChange, handleRecenter, MapRef } = useMapController({isTracking, startTracking, stopTracking, route, initialLocation});
  
  if (!initialLocation) return <LoadingScreen message='Finding your location...' />
  }

  return (
    <View style={styles.mainContainer}>
      <Text>
        Points collected: {route.length}
      </Text>


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

        <AppButton
        title='Center'
        onPress={handleRecenter}
        variant='primary'
        />

      </View>

        <AppButton
        title={isTracking ? 'Pause Walk' : 'Start Walk'}
        onPress={handlePress}
        variant={isTracking ? 'secondary' : 'primary'}
        />

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
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 5,
  }
});


import AppButton from 'app/components/atoms/AppButton';
import useLocation from '../../hooks/useLocation'
import useMapController from '../../hooks/useMapController';
import { StyleSheet, View, Text, Button } from 'react-native';
import LoadingScreen from 'app/components/atoms/LoadingScreen';
import MainMap from 'app/components/organisms/MainMap';
import StatBar from 'app/components/molecules/StatBar';

const API_URL = 'http://10.103.1.238:8000'

export default function HomeScreen() {
  const { route, isTracking, startTracking, stopTracking, initialLocation } = useLocation();

  const { handlePress, setIsFollowing, handleRegionChange, handleRecenter, MapRef } = useMapController({isTracking, startTracking, stopTracking, route, initialLocation});
  
  if (!initialLocation) return <LoadingScreen message='Finding your location...' />
  
  return (
    <View style={styles.mainContainer}>
      <StatBar
      route={route}
      />

      <MainMap
        setIsFollowing={setIsFollowing}
        MapRef={MapRef}
        initialLocation={initialLocation}
        handleRegionChange={handleRegionChange}
        route={route}
      />

        <AppButton
        title={isTracking ? 'Pause Walk' : 'Start Walk'}
        onPress={handlePress}
        variant={isTracking ? 'secondary' : 'primary'}
        />

    </View>
  )
}
  
const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 42,    
  },
});


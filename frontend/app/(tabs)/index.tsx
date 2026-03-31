import AppButton from 'app/components/atoms/AppButton';
import useLocation from '../../hooks/useLocation'
import useMapController from '../../hooks/useMapController';
import { StyleSheet, View, Text, Button } from 'react-native';
import LoadingScreen from 'app/components/atoms/LoadingScreen';
import MainMap from 'app/components/organisms/MainMap';
import StatBar from 'app/components/molecules/StatBar';
import SpotterModal from 'app/components/organisms/SpotterModal';
import usePlace from 'hooks/usePlace';
import useSpotter from 'hooks/useSpotter';

export default function HomeScreen() {
  const { route, isTracking, startTracking, stopTracking, initialLocation } = useLocation();
  const { handlePress, setIsFollowing, handleRegionChange, handleRecenter, MapRef } = useMapController({isTracking, startTracking, stopTracking, route, initialLocation});
  const { places, isLoading } = usePlace();
  const { tempCoordinate, isSheetVisible, handleMapLongPress, handleCancel } = useSpotter();

  if (!initialLocation || isLoading) return <LoadingScreen message='Finding your location...' />
  
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
        places={places}
        handleMapLongPress={handleMapLongPress}
        tempCoordinate={tempCoordinate}
      />

        


      <AppButton
      title={'Follow me'}
      onPress={handleRecenter}
      variant='floating'
      />


        <AppButton
        title={isTracking ? 'Finish Walk' : 'Start Walk'}
        onPress={handlePress}
        variant={isTracking ? 'secondary' : 'primary'}
        />

          <SpotterModal
            tempCoordinate={tempCoordinate}
            handleCancel={handleCancel}
            isSheetVisible={isSheetVisible}
          />
    </View>
  )
}
  
const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 42,    
  },
});


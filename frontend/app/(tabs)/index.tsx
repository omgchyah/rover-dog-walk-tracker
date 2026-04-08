import AppButton from 'app/components/atoms/AppButton';
import useLocation from '../../src/hooks/useLocation'
import useMapController from '../../src/hooks/useMapController';
import { StyleSheet, View, Text, Alert } from 'react-native';
import LoadingScreen from 'app/components/atoms/LoadingScreen';
import MainMap from 'app/components/organisms/MainMap';
import StatBar from 'app/components/molecules/StatBar';
import SpotterModal from 'app/components/organisms/SpotterModal';
import usePlace from '../../src/hooks/usePlace';
import useSpotter from '../../src/hooks/useSpotter';
import { Place } from '@/types/place';
import usePlaceDetail from '../../src/hooks/usePlaceDetail'
import PlaceDetailModal from 'app/components/molecules/PlaceDetailModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { route, isTracking, startTracking, stopTracking, initialLocation } = useLocation();
  const { handlePress, setIsFollowing, handleRegionChange, handleRecenter, MapRef } = useMapController({isTracking, startTracking, stopTracking, route, initialLocation});
  const { places, isLoading, addPlaceLocally } = usePlace();
  const { tempCoordinate, isSheetVisible, handleMapLongPress, handleCancel } = useSpotter();
  const { isDetailVisible, handleMarkerPress, selectedPlace, handleCloseModal } = usePlaceDetail();

  const handleSaveSuccess = (newPlace: Place) => {
    const formattedPlace = {
      ...newPlace,
      latitude: Number(newPlace.latitude),
      longitude: Number(newPlace.longitude),
    };

    addPlaceLocally(formattedPlace);
    handleCancel();
    console.log("Spot saved and Map updated!");

    Alert.alert(
      `Spot Spotted!`,
      `${newPlace.name} will be reviewed and added to the map for all the neighborhood pups.`,
      [
        {text: "Awesome!", onPress: () => handleCancel()}
      ]

    );
  }

  if (!initialLocation || isLoading) return <LoadingScreen message='Finding your location...' />
  
  return (
    <View
    style={[
      styles.mainContainer,
      {paddingTop: insets.top}
    ]}
    >
      <Text style={styles.title}>
              Walk Tracker
            </Text>


      <MainMap
        setIsFollowing={setIsFollowing}
        MapRef={MapRef}
        initialLocation={initialLocation}
        handleRegionChange={handleRegionChange}
        route={route}
        places={places}
        handleMapLongPress={handleMapLongPress}
        tempCoordinate={tempCoordinate}
        handleMarkerPress={handleMarkerPress}
      />

        

      

      <AppButton
      title={'Follow me'}
      onPress={handleRecenter}
      variant='floating'
      />

      <StatBar
      route={route}
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
            onSaveSuccess={handleSaveSuccess}
          />

          {selectedPlace && (
            <PlaceDetailModal
            place={selectedPlace}
            handleCloseModal={handleCloseModal}
            />
          )}
    </View>
  )
}
  
const styles = StyleSheet.create({
  mainContainer: { 
    alignContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',

  }
});


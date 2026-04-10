import AppButton from '../../app/components/atoms/AppButton'
import useLocation from '../../src/hooks/useLocation'
import useMapController from '../../src/hooks/useMapController';
import { StyleSheet, View, Text, Alert, Image, ScrollView } from 'react-native';
import LoadingScreen from '../../app/components/atoms/LoadingScreen';
import MainMap from '../../app/components/organisms/MainMap';
import StatBar from '../../app/components/molecules/StatBar';
import SpotterModal from '../../app/components/organisms/SpotterModal';
import usePlace from '../../src/hooks/usePlace';
import useSpotter from '../../src/hooks/useSpotter';
import usePet from '../../src/hooks/usePet';
import { Place } from '@/types/place';
import usePlaceDetail from '../../src/hooks/usePlaceDetail'
import PlaceDetailModal from '../../app/components/molecules/PlaceDetailModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PetSelect from '../../app/components/molecules/PetSelect';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { route, isTracking, startTracking, stopTracking, initialLocation, clearRoute } = useLocation();
  const { handlePress, setIsFollowing, handleRegionChange, handleRecenter, MapRef } = useMapController({isTracking, startTracking, stopTracking, route, initialLocation});
  const { places, isLoading, addPlaceLocally } = usePlace();
  const { tempCoordinate, isSheetVisible, handleMapLongPress, handleCancel } = useSpotter();
  const { handleMarkerPress, selectedPlace, handleCloseModal } = usePlaceDetail();
  const { selectedPets, togglePet, handlePetSelection, isPetModalVisible, pets, clearPets } = usePet();
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
  const handleFinishWalk = () => {
    stopTracking();
    clearPets();
    clearRoute();
  }
  const activePets = pets.filter(pet => selectedPets.includes(pet.id));

  if (!initialLocation || isLoading) return <LoadingScreen message='Finding your location...' />
  
  return (
    <View
    style={[
      styles.mainContainer,
      {paddingTop: insets.top, paddingBottom: insets.bottom}
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
      title={'Center'}
      onPress={handleRecenter}
      variant='floating'
      />

<ScrollView horizontal={true} style={{flexGrow: 0}}> 
      {activePets.length > 0 && (
        activePets.map((pet) => (
          
          <View key={pet.id} style={styles.petInfo}> 
            <Image
            source={{uri: pet.image_url}}
             style={styles.avatar}
                    />
          <Text style={styles.petName}>{pet.name}</Text>
          </View>
          
        ))
      )}
      </ScrollView>

      

<View style={styles.actionButtons}>
{/* <StatBar
      route={route}
      /> */}
        {selectedPets.length > 0 && <AppButton
        title={isTracking ? 'Pause Walk' : 'Start Walk'}
        onPress={handlePress}
        variant={isTracking ? 'secondary' : 'primary'}
        />
}

{isTracking && selectedPets.length > 0 && (
  
  
  <AppButton
  title={'Finish Walk'}
  onPress={handleFinishWalk}
  variant={'danger'}
  />
  
)}

{selectedPets.length === 0 && <AppButton
        title={'Select pets to walk'}
        onPress={handlePetSelection}
        variant={isTracking ? 'secondary' : 'primary'}
        />
}
</View>

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
            activePets={activePets}
            />
          )}

          {isPetModalVisible && (
            <PetSelect
            pets={pets}
            selectedPets={selectedPets}
            togglePet={togglePet}
            onClose={handlePetSelection}
            />
            )}
    </View>
  )
}
  
const styles = StyleSheet.create({
  mainContainer: { 
    alignContent: 'center',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  actionButtons: {
    justifyContent: 'center',
  },
  petInfo: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F1F3F4',
  },
  petName: {
    fontSize: 8,
    fontWeight: '500',
    color: '#212121',
  },
});


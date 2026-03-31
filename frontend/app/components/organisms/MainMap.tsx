import { StyleSheet } from 'react-native';
import React from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { Coordinate, MapRegion } from 'types/location';
import { Place } from 'types/place';
import AppMarker from '../atoms/AppMarker';

interface MainMapInterface {
    setIsFollowing: (isFollowing: boolean) => void;
    MapRef: React.RefObject<MapView | null>;
    initialLocation: MapRegion;
    handleRegionChange: (region: MapRegion) => void;
    route: Coordinate[];
    places: Place[];
    handleMapLongPress: (coordinate: Coordinate) => void;
    tempCoordinate: Coordinate | null;
    onPress: () => void;
}

const MainMap = (
    {setIsFollowing, MapRef, initialLocation, handleRegionChange, route, places, handleMapLongPress, tempCoordinate, onPress }: MainMapInterface
) => {
  return (
    <MapView
      onPanDrag={() => setIsFollowing(false)}
      ref={MapRef}
      style={styles.mapContainer}
      initialRegion={initialLocation}
      onRegionChangeComplete={(handleRegionChange)}
      showsUserLocation={true}
      followsUserLocation={false}
      onLongPress={(e) => handleMapLongPress(e.nativeEvent.coordinate)}
      >
      
      {tempCoordinate && (
          <Marker
            coordinate={tempCoordinate}
            opacity={0.5}
            title='NewSpotLocation'
          />
      )}

      {places.map(place => {

        return (
            <AppMarker
              key={place.id}
              category={place.category}
              latitude={Number(place.latitude)}
              longitude={Number(place.longitude)}
              onPress={onPress}
              />
        );
      })}

        {route.length > 0 && (
          <>
            <Polyline
            coordinates={route}
            strokeWidth={5}
            strokeColor='green'
            />


            <Marker
            coordinate={route[0]}
            pinColor='navy'
            title="Start of Walk"
            />
          </>
        )}
      </MapView>
  )
}

export default MainMap

const styles = StyleSheet.create({
      mapContainer: {
        width: '100%',
        height: '80%',
      },
})
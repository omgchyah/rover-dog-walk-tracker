import { View, StyleSheet} from 'react-native'
import React from 'react'
import MapView, { Marker, Polyline, Region } from 'react-native-maps'
import { Coordinate, MapRegion } from 'types/location';
import { Place } from 'types/place';
import Ionicons from '@expo/vector-icons/Ionicons';

interface MainMapInterface {
    setIsFollowing: (isFollowing: boolean) => void;
    MapRef: React.RefObject<MapView | null>;
    initialLocation: MapRegion;
    handleRegionChange: (region: MapRegion) => void;
    route: Coordinate[];
    places: Place[];
    newCoordinate: Coordinate;
    handleMapLongPress: (coordinate: Coordinate) => void;
}

const MainMap = (
    {setIsFollowing, MapRef, initialLocation, handleRegionChange, route, places, handleMapLongPress, newCoordinate }: MainMapInterface
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
      onLongPress={() => handleMapLongPress(newCoordinate)}
      >
          {places.map(place => (
              <Marker
              key={place.id}
              coordinate={{
                latitude: Number(place.latitude),
                longitude: Number(place.longitude)
            }}
              >
                <View>
                  <Ionicons />

                </View>
              </Marker>
          ))}

        {route.length > 0 && (
          <>
            <Polyline
            coordinates={route}
            strokeWidth={5}
            strokeColor='green'
            />


            <Marker
            coordinate={route[0]}
            pinColor='grenavyen'
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
      }
})
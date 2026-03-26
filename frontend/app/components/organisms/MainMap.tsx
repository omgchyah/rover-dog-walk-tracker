import { StyleSheet} from 'react-native'
import React from 'react'
import MapView, { Marker, Polyline, Region } from 'react-native-maps'
import { Coordinate, MapRegion } from 'types/location';

interface MainMapInterface {
    setIsFollowing: (isFollowing: boolean) => void;
    MapRef: React.RefObject<MapView | null>;
    initialLocation: MapRegion;
    handleRegionChange: (region: MapRegion) => void;
    route: Coordinate[];
}

const MainMap = (
    {setIsFollowing, MapRef, initialLocation, handleRegionChange, route }: MainMapInterface
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
  )
}

export default MainMap

const styles = StyleSheet.create({
      mapContainer: {
        width: '100%',
        height: '80%',
      }
})
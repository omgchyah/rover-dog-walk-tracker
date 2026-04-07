import { StyleSheet, Text, Modal, Pressable, View } from 'react-native'
import React from 'react'
import { Place } from '@/types/place';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PlaceDetailModalInterface {
    place: Place | null;
    handleCloseModal: () => void;
}

const PlaceDetailModal = ({
    place, handleCloseModal
}: PlaceDetailModalInterface) => {
    const insets = useSafeAreaInsets();

  return (
    <Modal
    transparent={true}
    animationType='slide'
    >
        <Pressable
        style={styles.overlay}
        onPress={handleCloseModal}
        >


    <Pressable
    style={[
        styles.sheet,
        {paddingBottom: insets.bottom}
    
    ]}
    onPress={(e) => e.stopPropagation()}
    >
        {place && (
            <>
        <Text>{place.name}</Text>

        {place.review_count
        ? (
            <Text>{place.average_review}({place.review_count})</Text>
        ) : (
            <Text>No reviews.</Text>
        )
        }

        <Text>{place.category}</Text>
        <Text>{place.allows_unleashed}</Text>
        <Text>{place.requires_entry_fee}</Text>
        <Text>{place.is_enclosed}</Text>
        
        <Text>{place.description}</Text>
                </>
            )}

    </Pressable>
        </Pressable>

    </Modal>
  )
}

export default PlaceDetailModal

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: '100%',
        justifyContent: 'flex-end'
    },
    sheet: {
        height: '50%',
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          padding: 20
        
    }

});
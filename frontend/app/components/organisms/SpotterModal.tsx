import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import AppButton from '../atoms/AppButton'
import { Coordinate } from 'types/location'

interface SpotterModalInterface {
    tempCoordinate: Coordinate | null;
    handleCancel: () => void;
    isSheetVisible: boolean;

}

const SpotterModal = (
    { tempCoordinate, handleCancel, isSheetVisible }:
    SpotterModalInterface
) => {
  return (
    <Modal
    visible={!!tempCoordinate && isSheetVisible}
    animationType='slide'
    transparent={true}
    >

        <View
        style={styles.overlay}
        >
            <View
                style={styles.sheet}
            >

            <Text>
                Create New Place
            </Text>
            <AppButton
                title='Cancel'
                variant='danger'
                onPress={() => handleCancel()}
            />

            </View>
        </View>


    </Modal>
  )
}

export default SpotterModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sheet: {
        height: '40%',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white',
        padding: 16,

    }
})
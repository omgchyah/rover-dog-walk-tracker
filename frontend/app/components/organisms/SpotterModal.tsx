import { 
    StyleSheet, 
    Text, 
    View, 
    Modal, 
    TouchableOpacity, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform 
  } from 'react-native'
  import React from 'react'
  import AppButton from '../atoms/AppButton'
  import { Coordinate } from '../../../src/types/location'
  import PlaceForm from './PlaceForm';
import { Place } from '@/types/place';
import COLORS from '@/theme/colors';
  
  interface SpotterModalInterface {
      tempCoordinate: Coordinate | null;
      handleCancel: () => void;
      isSheetVisible: boolean;
      onSaveSuccess: (place: Place) => void;
  }
  
  const SpotterModal = ({ tempCoordinate, handleCancel, isSheetVisible, onSaveSuccess }: SpotterModalInterface) => {
    return (
      <Modal
        visible={!!tempCoordinate && isSheetVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={handleCancel}
      >
              <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <Pressable onPress={(e) => e.stopPropagation()} style={styles.sheet}>

                  <Text style={styles.title}>Create New Spot</Text>

                  {tempCoordinate && 
                  <PlaceForm
                  tempCoordinate={tempCoordinate}
                  onSuccess={onSaveSuccess}
                  handleCancel={handleCancel}
                  />
                  }
                  
                </Pressable>
              </KeyboardAvoidingView>
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
        justifyContent: 'flex-end',
          height: '100%',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          backgroundColor: 'white',
          // paddingHorizontal: 10,
          // paddingBottom: Platform.OS === 'ios' ? 40 : 20,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 15,
          elevation: 20,
      },
      handle: {
          width: 40,
          height: 5,
          backgroundColor: '#E0E0E0',
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 15,
          shadowColor: "#000",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
      },
      header: {
      },
      title: {
        paddingVertical: 24,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F0F0F0',
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.5,
        // shadowRadius: 10,
        // elevation: 10,
      },
      content: {
          flexShrink: 1,
      },
      footer: {

        paddingTop: 50,
        // paddingBottom: Platform.OS === 'ios' ? 40 : 25,
        backgroundColor: 'white',
        borderTopWidth: Platform.OS === 'android' ? 0 : 1, 
        borderTopColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,

      },
      cancelButton: {
        padding: 12,
        margin: 8,
        borderRadius: 16,
        backgroundColor: COLORS.danger,
        color: 'white',
        fontWeight: 'bold',


      },
      closeButtonWrapper: {
        width: 52,
        alignItems: 'flex-end',
    },
  })
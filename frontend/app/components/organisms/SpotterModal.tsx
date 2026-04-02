import { 
    StyleSheet, 
    Text, 
    View, 
    Modal, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView, 
    Platform 
  } from 'react-native'
  import React from 'react'
  import AppButton from '../atoms/AppButton'
  import { Coordinate } from '../../../src/types/location'
  import PlaceForm from './PlaceForm';
import { Place } from '@/types/place';
  
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
        {/* 1. Backdrop tap-to-close */}
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.overlay}>
            
            {/* 2. Prevent taps inside the sheet from closing it */}
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.sheet}
              >
                {/* 3. The Visual Handle */}
                <View style={styles.handle} />
  
                <View style={styles.header}>
                  <Text style={styles.title}>Create New Spot</Text>
                </View>
  
                <View style={styles.content}>
                  {tempCoordinate && <PlaceForm
                  tempCoordinate={tempCoordinate}
                  onSuccess={onSaveSuccess}
                  />}
                </View>
  
                <View style={styles.footer}>
                  <AppButton
                    title='Cancel'
                    variant='danger'
                    onPress={handleCancel}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
  
  export default SpotterModal
  
  const styles = StyleSheet.create({
      overlay: {
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly lighter backdrop
      },
      sheet: {
          maxHeight: '85%', // Don't let it cover the WHOLE screen
          minHeight: '40%',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingBottom: Platform.OS === 'ios' ? 40 : 20, // Extra space for home bar
          // Shadow for "sitting on top" look
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
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
      },
      header: {
          marginBottom: 10,
      },
      title: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
      },
      content: {
          flexShrink: 1, // Allows form to be scrollable if needed
      },
      footer: {
          marginTop: 20,
      }
  })
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
  
  interface SpotterModalInterface {
      tempCoordinate: Coordinate | null;
      handleCancel: () => void;
      isSheetVisible: boolean;
      onSaveSuccess: (place: Place) => void;
  }
  
  const SpotterModal = ({ tempCoordinate, handleCancel, isSheetVisible, onSaveSuccess }: SpotterModalInterface) => {
    const insets = useSafeAreaInsets();
    
    return (
      <Modal
        visible={!!tempCoordinate && isSheetVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={handleCancel}
      >
                <Pressable
                onPress={(e) => e.stopPropagation()}
                style={[styles.sheet, {paddingTop: insets.top, paddingBottom: insets.bottom }]}>

                  <Text style={styles.title}>Create New Spot</Text>

                  {tempCoordinate && 
                  <PlaceForm
                  tempCoordinate={tempCoordinate}
                  onSuccess={onSaveSuccess}
                  handleCancel={handleCancel}
                  />
                  }
                  
                </Pressable>
      </Modal>
    )
  }
  
  export default SpotterModal
  
  const styles = StyleSheet.create({
      sheet: {
        justifyContent: 'flex-end',
          height: '100%',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          backgroundColor: 'white',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 15,
          elevation: 20,
      },
      title: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F0F0F0',
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
      },
      content: {
          flexShrink: 1,
      },
  })
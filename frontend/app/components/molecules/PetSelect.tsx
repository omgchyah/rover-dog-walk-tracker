import { StyleSheet, Text, View, Modal, Image, Pressable, ScrollView } from 'react-native'
import { Pet } from '@/types/pet';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../atoms/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PetSelectInterface {
  pets: Pet[];
  selectedPets: number[];
  togglePet: (id: number) => void;
  onClose: () => void;
}

const PetSelect = (
  {pets, selectedPets, togglePet, onClose }:
  PetSelectInterface
) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
    transparent={true}
    animationType='slide'
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
        style={[
          styles.sheet,
          {paddingBottom: insets.bottom}
        ]}
        onPress={(e) => e.stopPropagation()}>

      <Text style={styles.title}>Select pets to walk</Text>

      <ScrollView style={styles.list}>

        {pets.map((pet) => (
          <Pressable
          key={pet.id}
          style={styles.petRow}
          onPress={() => togglePet(pet.id)}
          >
            <View style={styles.petInfo}>
              <Image
              source={{ uri: pet.image_url }}
              style={styles.avatar}
              />
              <Text style={styles.petName}>{pet.name}</Text>
            </View>
            <View style={[
              styles.checkbox,
              selectedPets.includes(pet.id) && styles.checkboxSelected
            ]}>
              {selectedPets.includes(pet.id) && 
              <Ionicons name='checkmark' size={16} color='white' />
              }

            </View>

          </Pressable>
        ))}


      </ScrollView>

      <AppButton
      title='Save'
      variant='primary'
      onPress={onClose}
       />



        </Pressable>



      </Pressable>

      

    </Modal>
  )
}

export default PetSelect

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 40,
    maxHeight: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  list: {
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F3F4',
  },
  petName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#212121',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4A4A4A', // O el color azul de tu botón
    borderColor: '#4A4A4A',
  },
})
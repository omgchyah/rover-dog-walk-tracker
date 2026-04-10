import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import usePet from '@/hooks/usePet' 
import COLORS from '@/theme/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Foundation from '@expo/vector-icons/Foundation'
import { Pet } from '../../src/types/pet'
import LoadingScreen from 'app/components/atoms/LoadingScreen'



const PetsTab = () => {
  const { pets, isLoadingPets } = usePet();

  const renderPetCard = ({ item: pet }: { item: Pet }) => (
    <View style={styles.card}>
      <Image source={{ uri: pet.image_url }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.breed}>{pet.breed}</Text>
        </View>

        <View style={styles.tagContainer}>
          <View style={[styles.tag, pet.is_social ? styles.tagSuccess : styles.tagDanger]}>
            <FontAwesome 
              name={pet.is_social ? "users" : "user-times"} 
              size={12} 
              color={pet.is_social ? "#2e7d32" : "#c62828"} 
            />
            <Text style={[styles.tagText, { color: pet.is_social ? "#2e7d32" : "#c62828" }]}>
              {pet.is_social ? "Social" : "Grumpy"}
            </Text>
          </View>

          {/* Pipican tag */}
          <View style={[styles.tag, pet.is_pipican_allowed ? styles.tagSuccess : styles.tagDanger]}>
            <Foundation 
              name="trees" 
              size={14} 
              color={pet.is_pipican_allowed ? "#2e7d32" : "#c62828"} 
            />
            <Text style={[styles.tagText, { color: pet.is_pipican_allowed ? "#2e7d32" : "#c62828" }]}>
              {pet.is_pipican_allowed ? "Pipican OK" : "No Pipican"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoadingPets) return <LoadingScreen message='Loading all pets...' />
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pets</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPetCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PetsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Gris clarito tipo iOS
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#1c1c1e'
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  breed: {
    fontSize: 14,
    color: '#8e8e93',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  tagSuccess: {
    backgroundColor: '#e8f5e9',
  },
  tagDanger: {
    backgroundColor: '#ffebee',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  }
});
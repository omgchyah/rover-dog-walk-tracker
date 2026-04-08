import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import usePet from '@/hooks/usePet' 
import COLORS from '@/theme/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Foundation from '@expo/vector-icons/Foundation'

const PetsTab = () => {
  const { pets, loading } = usePet();

  const renderPetCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.breed}>{item.breed}</Text>
        </View>

        <View style={styles.tagContainer}>
          {/* Tag de Social */}
          <View style={[styles.tag, item.is_social ? styles.tagSuccess : styles.tagDanger]}>
            <FontAwesome 
              name={item.is_social ? "users" : "user-times"} 
              size={12} 
              color={item.is_social ? "#2e7d32" : "#c62828"} 
            />
            <Text style={[styles.tagText, { color: item.is_social ? "#2e7d32" : "#c62828" }]}>
              {item.is_social ? "Social" : "Grumpy"}
            </Text>
          </View>

          {/* Tag de Pipican */}
          <View style={[styles.tag, item.is_pipican_allowed ? styles.tagSuccess : styles.tagDanger]}>
            <Foundation 
              name="trees" 
              size={14} 
              color={item.is_pipican_allowed ? "#2e7d32" : "#c62828"} 
            />
            <Text style={[styles.tagText, { color: item.is_pipican_allowed ? "#2e7d32" : "#c62828" }]}>
              {item.is_pipican_allowed ? "Pipican OK" : "No Pipican"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

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
    overflow: 'hidden', // Para que la imagen respete el border radius
    flexDirection: 'row',
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
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
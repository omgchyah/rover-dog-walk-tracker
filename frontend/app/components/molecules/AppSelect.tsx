import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Category } from '@/types/place';
import AppChip from '../atoms/AppChip';
import { CATEGORY_UI_DATA } from '@/constants/categories';
import AppLabel from '../atoms/AppLabel';

interface AppSelectInterface {
    categories: Category[];
    label: string;
    required?: boolean;
    selectedCategory: Category;
    onSelect: (category: Category) => void;
}

const AppSelect = (
    {categories, label, required, selectedCategory, onSelect}:
    AppSelectInterface
) => {
  return (
    <View style={styles.mainContainer}>
      <AppLabel
      label={label}
      required={required}
      />

    <ScrollView
    horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        >
      {categories.map((catValue: Category) => {
        const metadata = CATEGORY_UI_DATA[catValue]

        if(!metadata || !metadata.icon) {
          console.warn(`Missing metadata for category: ${catValue}`);
            return null;
        }
        
        return (
          <AppChip
          key={catValue}
          label={metadata.label}
          icon={metadata.icon}
          color={metadata.color}
          isActive={selectedCategory == catValue}
          onPress={() => onSelect(catValue)}
          />
        )
      })}
      </ScrollView>
    </View>
  )
}

export default AppSelect

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    textAlign: 'center',
    alignItems: 'center',
},
carouselContainer: {
    flexDirection: 'row',
    gap: 4, 
    paddingVertical: 12,
    paddingHorizontal: 4, 
}
})


import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AppLabel from '../atoms/AppLabel'
import ChevronIcon from 'app/icons/ChevronIcon';
import { Category } from 'types/place';
import AppChip from '../atoms/AppChip';

interface AppSelectInterface {
    categories: Category[];
    label: string;
    required?: boolean;
    isCategorySelected: boolean;
    selectedCategory: string;
}

const AppSelect = (
    {categories, label, required, isCategorySelected, selectedCategory}:
    AppSelectInterface
) => {
  return (
    <View style={styles.container}>

      {categories.map(category) => (
        <AppChip />
      )}


    </View>
  )
}

export default AppSelect

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',      
    }
})


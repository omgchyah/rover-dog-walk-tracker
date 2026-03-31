import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-screens';

interface  AppChipInterface {
    label: string;
    icon: Icon;
    isActive: boolean;
    onPress: () => void;
}

const AppChip = (
    {label, isActive, onPress}:
    AppChipInterface
) => {
  return (
    <TouchableOpacity>
      <Text>AppChip</Text>
    </TouchableOpacity>
  )
}

export default AppChip

const styles = StyleSheet.create({})
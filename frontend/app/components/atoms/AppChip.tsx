import { StyleSheet, Text, TouchableOpacity, Button, View } from 'react-native'
import React from 'react'

interface  AppChipInterface {
    label: string;
    icon: React.FC<{color: string, size?: number}>;
    isActive: boolean;
    onPress: () => void;
    color: string;
}

const AppChip = (
    {icon: IconComponent, label, isActive, onPress, color}:
    AppChipInterface
) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={styles.chip}>
      <View style={[isActive ? {backgroundColor: color, ...styles.iconContainerActive} : styles.iconContainerInactive]}>

      <IconComponent color={isActive ? 'white' : color} size={28}/>
      </View>
      <Text
      style={isActive ? styles.activeText : styles.inactiveText}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default AppChip

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
    
    padding: 15,
    width: 110,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,

  },
  iconContainerActive: {
borderWidth: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'transparent',
    padding: 20,
    borderRadius: 50,
  },
  iconContainerInactive: {

  },
  active: {
    
  },
  inactive: {
    borderColor: '#E0E0E0',
  },
  activeText: {
    color: 'black',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: 'gray',
  }

})
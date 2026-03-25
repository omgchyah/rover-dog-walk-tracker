import { StyleSheet, Pressable, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

interface ButtonInterface {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'secondary' | 'danger';
}

const AppButton = (
  {title, onPress, variant}: ButtonInterface
) => {
  return (
    <Pressable
    onPress={onPress}
      style={
        ({ pressed }) => [
        styles.baseButton,
        styles[`${variant}Button` as keyof typeof styles] as ViewStyle,
        pressed && styles.pressed
    ]}
    >
      <Text
      style={[styles.baseText,
        styles[`${variant}Text` as keyof typeof styles] as TextStyle
      ]}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default AppButton

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: '#2E67D1',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#E5E5EA',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
  dangerText: {
    color: '#FFFFFF',
  }
})
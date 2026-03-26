import { StyleSheet, Pressable, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

interface ButtonInterface {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'secondary' | 'danger' | 'floating';
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
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    margin: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: '#2E67D1',
    shadowColor: '#1B1F23',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#C9CFD4',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  floatingButton: {
    backgroundColor: '#2E67D1',
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    opacity: 0.7,
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
  },
  floatingText: {
    color: '#FFFFFF',
  },
})
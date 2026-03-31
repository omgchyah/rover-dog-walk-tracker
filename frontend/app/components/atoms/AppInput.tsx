import { StyleSheet, Text, TextInput, View, KeyboardTypeOptions } from 'react-native'
import React, { use, useState } from 'react'
import AppLabel from './AppLabel'

interface AppInputInterface {
    label: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    value: string;
    onChange: (text: string) => void;
    required?: boolean;
}

const AppInput = (
    {label, placeholder, value, onChange, required, keyboardType = 'default'}:
    AppInputInterface
) => {
  return (
    <View style={styles.textBox}>
        <AppLabel label={label} required={required}/>
      <TextInput
      style={styles.inputBox}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      accessibilityLabel={label}
      />
    </View>
  )
}

export default AppInput

const styles = StyleSheet.create({
    textBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 32,
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: '#C9CFD4',
        margin: 16,
    },
    inputBox: {
        padding: 16,
    }
})
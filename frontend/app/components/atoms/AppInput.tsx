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
        // 1. Change this from 'flex-start' to 'stretch' (or remove it, 'stretch' is default)
        alignItems: 'stretch', 
        justifyContent: 'center',
        paddingHorizontal: 16, // This creates the internal "breathing room"
        backgroundColor: 'white',
        
        // 2. Remove 'flex: 1' unless this single input should fill the whole screen height
        width: '100%', 
        marginVertical: 12,
        gap: 8,
    },
    inputBox: {
        borderColor: '#C9CFD4',
        borderRadius: 32,
        borderWidth: 2,
        padding: 12, // Increased for better touch target
        
        // 3. Explicitly tell the input to take all available space in the parent
        width: '100%', 
    }
})
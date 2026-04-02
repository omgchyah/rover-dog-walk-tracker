import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface AppLabelInterface {
    label: string;
    required?: boolean;
}

const AppLabel = (
    {label, required}: AppLabelInterface
) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      {required && <Text style={styles.asterisk}>*</Text>}
    </View>
  )
}

export default AppLabel

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#C9CFD4',
        alignItems: 'flex-start',
    },
    labelText: {


    },
    asterisk: {
        color: 'red',
    }

})
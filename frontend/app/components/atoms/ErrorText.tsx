import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '@/theme/colors'

interface ErrorTextInterface {
    message: string;
}

const ErrorText = (
    {message}:
    ErrorTextInterface
) => {
  return (
    <View>
      <Text
      style={styles.errorText}
      >
        {message}
        </Text>
    </View>
  )
}

export default ErrorText

const styles = StyleSheet.create({
    errorText: {
        color: COLORS.danger,
    }

})
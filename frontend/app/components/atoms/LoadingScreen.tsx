import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

interface LoadingScreenInterface {
    message: string;
}

const LoadingScreen = ({message}: LoadingScreenInterface) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00BD70" />
                <Text>{message}</Text>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({})
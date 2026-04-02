import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Coordinate } from '@/types/location'

interface StatBarInterface {
    route: Coordinate[];
}
const StatBar = (
    {route}: StatBarInterface
) => {
  return (
    <View>
      <Text>
        Points collected: {route.length}
      </Text>
    </View>
  )
}

export default StatBar

const styles = StyleSheet.create({})
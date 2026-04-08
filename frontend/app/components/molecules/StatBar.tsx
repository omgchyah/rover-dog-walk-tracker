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
    <View style={styles.container}>

      <View style={styles.stat_box}>
              <Text>
      Points collected:
              </Text>
              <Text>
      {route.length}
              </Text>
      </View>

      <View style={styles.stat_box}>
              <Text>
        Walk Time:
                </Text>
                <Text>
        {route.length}
        </Text>
        </View>


      <View style={styles.stat_box}>
        <Text>
          Distance:
        </Text>
        <Text>
0
        </Text>
      </View>
      
    </View>
  )
}

export default StatBar

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  stat_box: {
    flexDirection: 'column',

  }

})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { SafeAreaView } from 'react-native-safe-area-context';

const _layout = () => {
  return (
        <SafeAreaView style={styles.wrapper}>
    <Tabs>
        <TabSlot />
            <TabList style={styles.tabBar}>
                <TabTrigger name="index" href='/'>
                    <Text>Walk</Text>
                </TabTrigger>
                <TabTrigger name="pets" href='/pets'>
                    <Text>Pets</Text>
                </TabTrigger>
            </TabList>
    </Tabs>
        </SafeAreaView>
  )
}

export default _layout

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    tabBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    }
})
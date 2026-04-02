import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react'
import AppLabel from './AppLabel';

interface AppSwitchInterface {
    label: string;
    value: boolean;
    toggleSwitch: () => void;
    required?: boolean;

}

const AppSwitch = (
    {label, value, toggleSwitch, required}:
    AppSwitchInterface
) => {
  return (
    <View style={styles.container}>
        <AppLabel label={label} required={required}/>
      <Switch
      accessibilityLabel={label}
      value={value}
      onValueChange={toggleSwitch}
      >
      </Switch>
    </View>
  )
}

export default AppSwitch

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,

        margin: 16,

    }


})
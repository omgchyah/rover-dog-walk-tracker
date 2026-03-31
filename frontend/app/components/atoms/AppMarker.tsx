import { View, StyleSheet } from 'react-native';
import { mapIcon } from '../../icons/mapIcon';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';

interface AppMArkerInterface {
    category: string;
    latitude: number;
    longitude: number;
    onPress: () => void;
}

const AppMarker = (
    {category, latitude, longitude, onPress}:
    AppMArkerInterface
) => {
    const iconConfig = mapIcon(category);
    const IconLib = iconConfig.lib || MaterialCommunityIcons;
    
    return (
        <Marker
            coordinate={
                { latitude: latitude, longitude: longitude }}
                onPress={onPress}
        >
            <View style={styles.markerCircle}>
                <IconLib 
                    name={iconConfig.name} 
                    size={18} 
                    color={iconConfig.color} 
                />
            </View>
        </Marker>
        );
};

export default AppMarker

const styles = StyleSheet.create({
    markerCircle: {
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
});
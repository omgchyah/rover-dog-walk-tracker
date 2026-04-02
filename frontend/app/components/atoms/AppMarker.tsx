import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { CATEGORY_UI_DATA } from '@/constants/categories'; 
import { Category } from '@/types/place';
import * as Icons from '@/icons/mapIcon'


interface AppMarkerInterface {
    category: Category;
    latitude: number;
    longitude: number;
    onPress: () => void;
}

const AppMarker = ({ category, latitude, longitude, onPress }: AppMarkerInterface) => {
    const metadata = CATEGORY_UI_DATA[category];
    
    const IconComponent = metadata?.icon || Icons.StoreIcon;
    const themeColor = metadata?.color || '#3498db';

    return (
        <Marker
            coordinate={{ latitude, longitude }}
            onPress={onPress}
            tracksViewChanges={true}
            zIndex={100}
        >
            <View style={styles.markerCircle}>
                {IconComponent && (
                    <IconComponent color={themeColor} size={20} />
                )}
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
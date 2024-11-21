import * as React from 'react';
import { Text, View, Button, Linking, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Ecopoints() {
    const openGoogleMaps = () => {
        const latitude = -7.939101;
        const longitude = -34.879947;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error("Failed to open Google Maps: ", err));
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -7.939101,
                    longitude: -34.879947,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: -7.939101, longitude: -34.879947 }}
                    title='Uninassau-Paulista'
                    description='Unidade Uninassau de Paulista'
                />
            </MapView>
            <Button title="Abrir no Google Maps" onPress={openGoogleMaps} color="#30687A" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

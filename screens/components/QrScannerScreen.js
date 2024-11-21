import { Camera, useCameraPermissions, CameraView } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { db, authentication } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function QrScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão da câmera para fazer isso funcionar!');
      }

      const fetchPoints = async () => {
        const user = authentication.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setPoints(userDocSnap.data().points || 0);
          }
        }
      };
      fetchPoints();
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const newPoints = points + 10; // Adiciona 10 pontos quando um QR code é lido
    setPoints(newPoints);

    const user = authentication.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { points: newPoints });
    }

    Alert.alert(
      `Código ${type} Scaneado`,
      `Dados: ${data}\nVocê ganhou 10 pontos!`,
      [
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ],
      { cancelable: false }
    );
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Permissão da câmera não concedida.</Text>
        <Button title="Solicitar Permissão" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
      <View style={styles.layerContainer}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Pontos: {points}</Text>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#215678',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  layerContainer: {
    flex: 1,
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#215678',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  pointsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  pointsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#215678',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

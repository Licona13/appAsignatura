
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props ={
  onCancel: () => void;
  onTakePicture:(uri?: string) => void;
}

/**
 * Componente para tomar foto
 * @returns 
 */

export  function CameraComponent(
  {onCancel, onTakePicture}: Props
) {
  const [facing, setFacing] = useState<CameraType>('back');
  const ref = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Se necesita permiso para acceder a la cámara</Text>
        <Button onPress={requestPermission} title="Otorgar permiso" />
        
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    //enviar la imagen al componente padre
    onTakePicture(photo?.uri)
  };

  return (
    
    <View style={styles.container}>
      <CameraView 
      ref={ref}
      style={styles.camera} 
      facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={() => onCancel()}
          style={styles.button}
          >

            <Ionicons
            name="close"
            size={32}
            color= "white"
            />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={takePicture}
          style={styles.button}
          >

            <Ionicons
            name="camera"
            size={64}
            color= "white"
            />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={toggleCameraFacing}
          style={styles.button}
          >

            <Ionicons
            name="camera-reverse-outline"
            size={32}
            color= "white"
            />
          </TouchableOpacity>

        </View>
      </CameraView>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    position:"absolute",
    bottom:0
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

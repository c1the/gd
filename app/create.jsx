import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { PhotoRecognizer } from "react-native-vision-camera-text-recognition";
import * as Speech from 'expo-speech';  
import { useFocusEffect } from '@react-navigation/native';

function App() {
  const device = useCameraDevice('back');
  const camera = useRef(null);  
  const [scannedText, setScannedText] = useState('Tap to capture...');  
  const [isScanning, setIsScanning] = useState(false); 
  const [isCameraActive, setIsCameraActive] = useState(true); 

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') {
        console.error('Camera permission denied');
      }
    };
    requestCameraPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsCameraActive(true);

      return () => {
        setIsCameraActive(false);
        Speech.stop(); 
      };
    }, [])
  );

  const handleCapturePhoto = async () => {
    if (camera.current) {
      if (isScanning) {
        setIsScanning(false);
        setScannedText('Tap to capture...');  
        Speech.stop();  
        console.log('Scanning stopped.');  
      } else {
        try {
          setIsScanning(true);  
          const photo = await camera.current.takePhoto();  
          const result = await PhotoRecognizer({
            uri: photo.path,  
            orientation: "portrait",  
          });

          const recognizedText = result.resultText;  
          console.log(result);  
          setScannedText(recognizedText);  

          const logMessage = `Recognized text: ${recognizedText || 'no text found'}`;
          console.log(logMessage); 
          Speech.speak(logMessage); 

        } catch (error) {
          console.error("Error taking photo:", error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {!!device && isCameraActive && (
        <Camera
          ref={camera}  
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}  
        />
      )}
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleCapturePhoto}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {scannedText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    transform: [{ translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;

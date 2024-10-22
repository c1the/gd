import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { PhotoRecognizer } from "react-native-vision-camera-text-recognition";
import * as Speech from 'expo-speech';  // Import expo-speech
import { useFocusEffect } from '@react-navigation/native';

function App() {
  const device = useCameraDevice('back');
  const camera = useRef(null);  // Ref for the camera
  const [scannedText, setScannedText] = useState('Tap to capture...');  // State to store the scanned text
  const [isScanning, setIsScanning] = useState(false);  // State to track if scanning is active
  const [isCameraActive, setIsCameraActive] = useState(true); // Track camera active state

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
      // Activate the camera when the screen is focused
      setIsCameraActive(true);

      return () => {
        // Deactivate the camera when the screen is unfocused
        setIsCameraActive(false);
        Speech.stop();  // Stop any ongoing speech
      };
    }, [])
  );

  const handleCapturePhoto = async () => {
    if (camera.current) {
      if (isScanning) {
        // If currently scanning, stop the scanning
        setIsScanning(false);
        setScannedText('Tap to capture...');  // Reset the scanned text
        Speech.stop();  // Stop any ongoing speech
        console.log('Scanning stopped.');  // Log message
      } else {
        // Start scanning
        try {
          setIsScanning(true);  // Set scanning to active
          const photo = await camera.current.takePhoto();  // Capture photo
          const result = await PhotoRecognizer({
            uri: photo.path,  // Use the captured photo's path
            orientation: "portrait",  // Assuming portrait mode, adjust if necessary
          });

          // Extract the recognized text from the result
          const recognizedText = result.resultText;  // Access resultText
          console.log(result);  // Log the entire result object for debugging
          setScannedText(recognizedText);  // Display the recognized text

          // Speak the recognized text
          const logMessage = `Recognized text: ${recognizedText || 'no text found'}`;
          console.log(logMessage);  // Log the log message for debugging
          Speech.speak(logMessage);  // Read the log message aloud

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
          ref={camera}  // Camera ref
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}  // Enable photo capture
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

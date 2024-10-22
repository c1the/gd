import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera-image-labeler';
import * as Speech from 'expo-speech';  // Import expo-speech
import { useFocusEffect } from '@react-navigation/native';

function Explore() {
  const [data, setData] = useState(null);
  const [warningSpoken, setWarningSpoken] = useState(false);  // Track if warning has been spoken
  const [isCooldown, setIsCooldown] = useState(false);  // State for 5-second cooldown
  const device = useCameraDevice('back');
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
      console.log('Camera activated');

      return () => {
        // Deactivate the camera when the screen is unfocused
        setIsCameraActive(false);
        Speech.stop();  // Stop any ongoing speech
        console.log('Camera deactivated');
      };
    }, [])
  );

  useEffect(() => {
    if (data && !isCooldown) {  // Only proceed if not in cooldown
      const vehicleDetected = data.some(item => item.label === 'Vehicle' && item.confidence > 0.7);
      if (vehicleDetected) {
        Speech.speak('Warning, a vehicle is approaching!');
        setIsCooldown(true);  // Start the cooldown
        setWarningSpoken(true);

        // Set a 5-second timeout before allowing further detection
        setTimeout(() => {
          setIsCooldown(false);  // Reset cooldown after 5 seconds
          setWarningSpoken(false);  // Reset spoken warning
        }, 5000);  // 5 seconds
      }
    }
  }, [data, isCooldown]);

  return (
    <View style={styles.container}>
      {!!device && isCameraActive ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isCameraActive}
          options={{
            minConfidence: 0.1
          }}
          callback={(d) => setData(d)}
          onError={(error) => console.error('Camera error:', error)}  // Log camera errors
        />
      ) : (
        <Text>Loading camera...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Explore;

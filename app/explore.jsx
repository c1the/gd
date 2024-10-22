import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera-image-labeler';
import * as Speech from 'expo-speech';  
import { useFocusEffect } from '@react-navigation/native';

function Explore() {
  const [data, setData] = useState(null);
  const [warningSpoken, setWarningSpoken] = useState(false);  
  const [isCooldown, setIsCooldown] = useState(false);  
  const device = useCameraDevice('back');
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
      console.log('Camera activated');

      return () => {
        setIsCameraActive(false);
        Speech.stop();  
        console.log('Camera deactivated');
      };
    }, [])
  );

  useEffect(() => {
    if (data && !isCooldown) {  
      const vehicleDetected = data.some(item => item.label === 'Vehicle' && item.confidence > 0.7);
      if (vehicleDetected) {
        Speech.speak('Warning, a vehicle is approaching!');
        setIsCooldown(true);  
        setWarningSpoken(true);

        setTimeout(() => {
          setIsCooldown(false);  
          setWarningSpoken(false);  
        }, 5000);  
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
          onError={(error) => console.error('Camera error:', error)}  
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

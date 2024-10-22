import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera-image-labeler';
import * as Speech from 'expo-speech'; 

function App() {
  const [data, setData] = useState(null);
  const [detectedLabel, setDetectedLabel] = useState('Tap to capture...');  
  const device = useCameraDevice('back');

  const handleTap = () => {
    if (data && data.length > 0) {
      const highestConfidenceItem = data.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current);
      const label = `${highestConfidenceItem.label}`;
      setDetectedLabel(label);  
      Speech.speak(label);  
    } else {
      setDetectedLabel('Nothing detected');  
      Speech.speak('Nothing detected');
    }
  };

  return (
    <View style={styles.container}>
      {!!device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          options={{
            minConfidence: 0.1
          }}
          callback={(d) => setData(d)}  
        />
      )}
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleTap}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {detectedLabel} 
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
    top: '40%',
    left: '10%',
    right: '10%',
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

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { useImageLabeler } from 'react-native-vision-camera-v3-image-labeling';
import Tts from 'react-native-tts';
import Constants from 'expo-constants';
import Voice from '@react-native-voice/voice';

const Explore = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const device = useCameraDevice('back');
  const options = { minConfidence: 0.1 };
  const { scanImage } = useImageLabeler(options);

  const [lastPositions, setLastPositions] = useState(new Map());

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedObjects = scanImage(frame);
    
    // Process detected objects
    const currentPositions = new Map();
    detectedObjects.forEach((obj) => {
      if (obj.label === 'car') {
        const currentPosition = { x: obj.boundingBox.x, y: obj.boundingBox.y };
        currentPositions.set(obj.id, currentPosition); // Store current position for this car

        // Check if this car was detected in the previous frame
        const lastPosition = lastPositions.get(obj.id);
        if (lastPosition) {
          const distanceMoved = calculateDistance(lastPosition, currentPosition);
          if (distanceMoved > 20) { // Set a threshold for movement detection
            notifyUser('Car approaching from nearby!');
          }
        }
      }
    });

    // Update last positions with current positions for the next frame
    setLastPositions(currentPositions);
  }, []);

  const calculateDistance = (pos1, pos2) => {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
  };

  const notifyUser = (message) => {
    Alert.alert('Warning', message);
    Tts.speak(message);  // Text-to-speech 
  };

  const handleActivateNavigation = () => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDucking(true);  // Lowers music volume while TTS is playing
    setCameraActive(true);
    Tts.speak("Please point your phone both ways before crossing.");
    startListening();  // Start voice recognition when navigation is activated
  };

  const handleExitNavigation = () => {
    setCameraActive(false);
    stopListening();  // Stop voice recognition when navigation is exited
    setLastPositions(new Map()); // Clear positions when exiting
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }

    Voice.onSpeechResults = (event) => {
      const { value } = event;
      if (value.includes("exit navigation")) {
        handleExitNavigation();
      } else if (value.includes("start navigation")) {
        handleActivateNavigation();
      }
    };
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
    Voice.removeAllListeners();  // Clean up listeners
  };

  useEffect(() => {
    // Start listening for voice commands immediately when the app loads
    startListening();
    
    return () => {
      stopListening(); // Ensure cleanup on component unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <View style={StyleSheet.absoluteFill}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleExitNavigation}>
              <Text style={styles.buttonText}>Exit Navigation</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Navigation</Text>
          <Text style={styles.description}>
            Say "start navigation" to activate the navigation feature, or press the button below.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleActivateNavigation}>
            <Text style={styles.buttonText}>Activate Navigation</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Explore;

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera'; 
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd'; 
import * as Speech from 'expo-speech'; 
import Voice from '@react-native-voice/voice'; 
import Tesseract from 'tesseract.js'; 
import * as Haptics from 'expo-haptics'; 

const Create = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // For camera switching

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    getPermissions();
    loadModel();

    Voice.onSpeechResults = onSpeechResults; 
    startListening();

    return () => {
      stopListening();
      Voice.destroy().then(Voice.removeAllListeners); 
    };
  }, []);

  const onSpeechResults = (event) => {
    const { value } = event;
    if (value.includes("take photo")) {
      handleObjectDetection();
    } else if (value.includes("scan text")) {
      handleTextScanning();
    }
  };

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const handleObjectDetection = async () => {
    if (cameraRef.current && model) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      const imgB64 = await fetch(photo.uri);
      const imageTensor = tf.browser.fromPixels(imgB64);

      const predictions = await model.detect(imageTensor);
      readOutLoud(predictions);
      
      Haptics.impactAsync();
      stopListening();
      startListening();
    }
  };

  const handleTextScanning = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      Tesseract.recognize(photo.uri, 'eng', {
        logger: info => console.log(info),
      }).then(({ data: { text } }) => {
        readOutLoudText(text);
        Haptics.impactAsync();
      }).catch(error => {
        console.error(error);
      });
    }
  };

  const readOutLoud = (predictions) => {
    const detectedItems = predictions.map(pred => pred.class).join(', ');
    Speech.speak(`Detected objects: ${detectedItems}`, {
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  };

  const readOutLoudText = (text) => {
    Speech.speak(`Scanned text: ${text}`, {
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  };

  const toggleCameraType = () => {
    setCameraType((current) => (
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    ));
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}  // Toggle between front and back camera
        ref={cameraRef}
        accessibilityLabel="Camera view"
        accessibilityHint="The camera will detect objects or scan text."
      />
      <Text
        accessibilityLabel="Instructions for taking a photo or scanning text"
        accessibilityHint="Say 'take photo' or 'scan text'"
        style={styles.instructions}
      >
        Say "take photo" to capture an image or "scan text" to scan text.
      </Text>
      <Text
        accessibilityLabel="Listening status"
        style={styles.voiceStatus}
      >
        {isListening ? "Listening..." : "Listening..."}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
        <Text style={styles.buttonText}>Flip Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  instructions: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    textAlign: 'center',
    color: 'white',
  },
  voiceStatus: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: '40%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Create;

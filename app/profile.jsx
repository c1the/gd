import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Guide Dog</Text>
      <Text style={styles.description}>
        Our app is designed to assist users by providing real-time notifications about their surroundings using camera streaming, text detection, and object recognition.
      </Text>

      <Text style={styles.stepTitle}>Step 1: Enable Camera Access</Text>
      <Text style={styles.stepDescription}>
        Allow the app to access your camera to stream your surroundings and provide helpful notifications.
      </Text>

      <Text style={styles.stepTitle}>Step 2: Text Detection</Text>
      <Text style={styles.stepDescription}>
        Point your phone at any text and tap the screen to scan. The app will read the detected text aloud to assist you.
      </Text>

      <Text style={styles.stepTitle}>Step 3: Navigation Detection</Text>
      <Text style={styles.stepDescription}>
        To detect vehicles on either side, point your phone to the right and left for 5 seconds each. The app will alert you to nearby vehicles.
      </Text>

      <Text style={styles.stepTitle}>Step 4: Object Detection</Text>
      <Text style={styles.stepDescription}>
        Point your phone at any object and tap the screen. The app will recognize the object and notify you of its presence.
      </Text>

      <Text style={styles.stepTitle}>Step 5: Stay Safe</Text>
      <Text style={styles.stepDescription}>
        Always stay cautious while using the app. Rely on it as a guide, but continue to be aware of your surroundings.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 100,  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default Profile;

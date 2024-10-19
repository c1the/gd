import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Guide Dog</Text>
      <Text style={styles.description}>
        Our app is designed to help guide users by providing real-time notifications about their surroundings using camera streaming and machine learning.
      </Text>

      <Text style={styles.stepTitle}>Step 1: Enable Camera Access</Text>
      <Text style={styles.stepDescription}>
        To get started, please allow the app to access your camera. This enables the app to stream your surroundings and provide useful notifications.
      </Text>

      <Text style={styles.stepTitle}>Step 2: Point the Camera Forward</Text>
      <Text style={styles.stepDescription}>
        Hold your phone at chest level, with the camera facing forward. The app will begin analyzing your surroundings.
      </Text>

      <Text style={styles.stepTitle}>Step 3: Receive Notifications</Text>
      <Text style={styles.stepDescription}>
        The app will notify you of nearby objects, obstacles, or important points of interest. Listen to the real-time audio prompts that describe your environment.
      </Text>

      <Text style={styles.stepTitle}>Step 4: Customize Your Experience</Text>
      <Text style={styles.stepDescription}>
        In the settings, you can adjust the type of notifications you receive and control the volume of audio alerts.
      </Text>

      <Text style={styles.stepTitle}>Step 5: Stay Safe</Text>
      <Text style={styles.stepDescription}>
        Always use caution while using the app, and rely on it as a guide. Continue to stay aware of your surroundings.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
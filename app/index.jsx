import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Index = () => {
  const navigation = useNavigation(); // Store the navigation object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Guide Dog!</Text>
      <Text style={styles.subTitle}>How can we help?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('create')} // Use the stored navigation object
        >
          <Text style={styles.buttonText}>Photo Recognition</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('explore')} // Use the stored navigation object
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('profile')} // Use the stored navigation object
        >
          <Text style={styles.buttonText}>Tutorial</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color: '#000',
  },
  subTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    paddingVertical: 15,
    margin: 20,
    width: '70%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Index;

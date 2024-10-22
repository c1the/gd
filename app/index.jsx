import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

const Index = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FontAwesome5 name="dog" size={50} color="#128cbe" style={styles.icon} />

      <Text style={styles.title}>Welcome to Guide Dog!</Text>
      <Text style={styles.subTitle}>How can we help?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('create')} 
        >
          <Text style={styles.buttonText}>Photo Recognition</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('explore')}
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('profile')}
        >
          <Text style={styles.buttonText}>Tutorial</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('object')} 
        >
          <Text style={styles.buttonText}>Object</Text>
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
    paddingTop: 50,
    backgroundColor: '#f0f8ff',
  },
  icon: {
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color: '#0b4d68',
  },
  subTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#0b4d68',
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
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Index;

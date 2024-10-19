// hooks/useVoiceNavigation.js
import { useEffect } from 'react';
import { Voice } from 'react-native-voice'; // Make sure to install react-native-voice

const useVoiceNavigation = ({ onNavigate }) => {
  useEffect(() => {
    // Function to start listening to voice commands
    const startListening = async () => {
      try {
        await Voice.start('en-US'); // Start listening (you can change the language code)
      } catch (error) {
        console.error('Error starting voice recognition:', error);
      }
    };

    // Handle the results from the voice recognition
    const onSpeechResults = (event) => {
      const command = event.value[0].toLowerCase(); // Get the recognized command
      switch (command) {
        case 'photo recognition':
          onNavigate('explore'); // Navigate to 'explore'
          break;
        case 'navigation':
          onNavigate('create'); // Navigate to 'create'
          break;
        case 'tutorial':
          onNavigate('profile'); // Navigate to 'profile'
          break;
        case 'notifications':
          onNavigate('misc'); // Navigate to 'misc'
          break;
        default:
          console.log('Unknown command:', command);
          break;
      }
    };

    Voice.onSpeechResults = onSpeechResults; // Set the speech result handler

    startListening(); // Start listening when the component mounts

    // Clean up on component unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners); // Clean up the voice recognition
    };
  }, [onNavigate]); // Re-run effect when onNavigate changes
};

export default useVoiceNavigation;

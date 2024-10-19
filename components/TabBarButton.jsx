import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { icons } from '../assets/icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = (props) => {
    // Destructure props to extract necessary values
    const { isFocused, label, routeName, color } = props;

    // Create a shared value for the scale animation
    const scale = useSharedValue(0);

    // Effect to update the scale value based on the focus state
    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 } // Set duration for the spring animation
        );
    }, [scale, isFocused]); // Re-run effect when scale or isFocused changes

    // Animated style for the icon
    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(
            scale.value,
            [0, 1], // Input range
            [1, 1.4] // Output range for scaling the icon
        );
        const top = interpolate(
            scale.value,
            [0, 1], // Input range
            [0, 8] // Output range for vertical position
        );

        return {
            transform: [{ scale: scaleValue }], // Apply scaling transformation
            top // Set the top position based on interpolation
        };
    });

    // Animated style for the text label
    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scale.value,
            [0, 1], // Input range
            [1, 0] // Output range for fading out the text
        );

        return {
            opacity // Set the opacity based on interpolation
        };
    });

    return (
        <Pressable {...props} style={styles.container}>
            {/* Animated view for the icon */}
            <Animated.View style={[animatedIconStyle]}>
                {
                    // Render the icon based on route name and color
                    icons[routeName]({
                        color
                    })
                }
            </Animated.View>
            
            {/* Animated text for the label */}
            <Animated.Text style={[{ 
                color, // Set text color
                fontSize: 11 // Set font size
            }, animatedTextStyle]}>
                {label} {/* Display the label */}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Allow container to grow and fill space
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        gap: 4 // Add space between icon and label
    }
});

export default TabBarButton;

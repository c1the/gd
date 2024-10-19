import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';

const TabBar = ({ state, descriptors, navigation }) => {
    // Define colors for the active and inactive tab states
    const primaryColor = '#0891b2'; // Color for the focused tab
    const greyColor = '#737373'; // Color for unfocused tabs

    return (
        <View style={styles.tabbar}>
            {/* Map over the routes in the state */}
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]; // Get the options for the current route
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel // Use provided tabBarLabel if available
                        : options.title !== undefined
                        ? options.title // Use title if tabBarLabel is not available
                        : route.name; // Fallback to route name

                // Exclude specific routes from the tab bar
                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index; // Check if the current tab is focused

                // Function to handle tab press events
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key, // Targeting the specific tab
                        canPreventDefault: true,
                    });

                    // Navigate only if the tab is not already focused and no default prevention occurred
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params); // Navigate to the route
                    }
                };

                // Function to handle long press events on tabs
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key, // Targeting the specific tab for long press
                    });
                };

                return (
                    <TabBarButton 
                        key={route.name} // Unique key for each tab button
                        style={styles.tabbarItem}
                        onPress={onPress} // Assign press handler
                        onLongPress={onLongPress} // Assign long press handler
                        isFocused={isFocused} // Pass focused state
                        routeName={route.name} // Pass route name
                        color={isFocused ? primaryColor : greyColor} // Set color based on focus
                        label={label} // Set the label for the tab
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute', // Position the tab bar at the bottom
        bottom: 25,
        flexDirection: 'row', // Arrange tabs in a row
        justifyContent: 'space-between', // Space tabs evenly
        alignItems: 'center', // Center items vertically
        backgroundColor: '#f0f8ff', // Background color of the tab bar
        marginHorizontal: 20, // Horizontal margin for spacing
        paddingVertical: 15, // Vertical padding for spacing
        borderRadius: 25, // Rounded corners
        borderCurve: 'continuous', // (Note: this prop doesn't exist in React Native, might be a typo)
        shadowColor: 'black', // Shadow color for elevation effect
        shadowOffset: { width: 0, height: 10 }, // Shadow offset
        shadowRadius: 10, // Shadow blur radius
        shadowOpacity: 0.1 // Shadow opacity
    }
});

export default TabBar;

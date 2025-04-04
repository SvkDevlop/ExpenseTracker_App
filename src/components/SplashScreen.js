import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      navigation.navigate('HomeScreen'); // Navigate to the authentication screen
    }, 3000); // Splash screen visible for 3 seconds (you can change the duration)
  }, []);

  return (
    isVisible && (
      <View style={styles.container}>
        <Image source={require("../images/logo.jpg")} style={styles.image} />
        <Text style={styles.text}>TechInfini</Text>
        <Text style={styles.text}>Welcome to Expense Tracker</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080', // Background color
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30, // Adding margin at the bottom to give space below the image
    borderRadius: 100, // Making the image circular
    shadowColor: "#000", // Shadow color for the image
    shadowOffset: { width: 0, height: 10 }, // Shadow position
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 5, // For Android shadow effect
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
  },
});

export default SplashScreen;

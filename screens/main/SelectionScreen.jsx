import { StyleSheet, Text, View, TouchableOpacity, BackHandler, ScrollView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const Selection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => backHandler.remove();
  }, []);

  const serviceOptions = [
    {
      id: 1,
      title: "Online Jain Manch",
      icon: "people-outline",
      description: "Connect with the Jain community online",
      route: "MainApp",
      src:require("../../assets/onlinejainmanchlogo.jpeg")
    },
    {
      id: 2,
      title: "Insurance Services",
      icon: "shield-checkmark-outline",
      description: "Explore our insurance solutions",
      route: "Insurance",
      src:require("../../assets/sarthaklogo.jpeg")

    },
    {
      id: 3,
      title: "Jainam Print",
      icon: "print-outline",
      description: "Professional printing services",
      route: null,
      src:require("../../assets/jainamprintlogo.jpeg")

    }
  ];

  const handlePress = (option) => {
    setSelectedOption(option.title);
    console.log(option.route);
    if (option.id=='1') {
      navigation.replace('MainApp');
    } else if (option.route) {
      navigation.navigate(option.route);
    } else {
      alert('This feature will be available soon!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Jainam</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Choose Your Service</Text>
        <ScrollView>
        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          style={styles.cardsContainer}
        >
          {serviceOptions.map((option) => (
           <TouchableOpacity
  key={option.id}
  style={styles.card}
  onPress={() => handlePress(option)}
>
  <ImageBackground
    source={option.src}
    style={styles.cardBackground}
    imageStyle={styles.cardBackgroundImage}
  >
    <View style={styles.cardIcon}>
      <Ionicons name={option.icon} size={32} color="#fff" />
    </View>
    <Text style={styles.cardTitle}>{option.title}</Text>
    <Text style={styles.cardDescription}>{option.description}</Text>
    <View style={styles.arrowContainer}>
      <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
    </View>
  </ImageBackground>
</TouchableOpacity>

          ))}
        </Animatable.View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1625",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#eea95aff",
    alignItems: 'center'
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    color: "#ffffffff",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "column",
  },
card: {
  width: "100%",
  borderRadius: 15,
  marginBottom: 20,
  minHeight: 140,
  overflow: "hidden", // ✅ Ensures rounded corners for image
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 8,
},
cardBackground: {
  flex: 1,
  justifyContent: 'center',
  padding: 20, // ✅ Move padding here so content isn't cut off
},
cardBackgroundImage: {
  borderRadius: 15,
  opacity: 0.45, // ✅ Makes the image slightly faded for readability
},

  cardIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    color: "#f9f8faff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 15,
  },
  arrowContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },

});
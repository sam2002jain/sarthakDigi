import { StyleSheet, Text, View, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Image, StatusBar } from 'react-native';
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
      src: require("../../assets/onlinejainmanchlogo.jpeg"),
    },
    {
      id: 2,
      title: "Insurance Services",
      icon: "shield-checkmark-outline",
      description: "Explore our insurance solutions",
      route: "Insurance",
      src: require("../../assets/insurancebg.jpg"),
    },
    {
      id: 3,
      title: "Jainam Print",
      icon: "print-outline",
      description: "Professional printing services",
      route: null,
      src: require("../../assets/jainamprintlogo.jpeg"),
    },
  ];

  const handlePress = (option) => {
    setSelectedOption(option.title);
    if (option.id === 1) {
      navigation.replace('MainApp');
    } else if (option.route) {
      navigation.navigate(option.route);
    } else {
      alert('This feature will be available soon!');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1625" />
      <View style={styles.header}>
        <Image
          source={require("../../assets/sarthakbg.jpeg")}
          style={styles.sarthakbgheader}
        />
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation="fadeInUp"
            duration={1500}
            style={styles.cardsContainer}
          >
            {/* Card 1 Full Width */}
            <TouchableOpacity
              key={serviceOptions[0].id}
              style={styles.cardFull}
              onPress={() => handlePress(serviceOptions[0])}
            >
              <ImageBackground
                source={serviceOptions[0].src}
                style={styles.cardBackground}
                imageStyle={styles.cardBackgroundImage}
                
              >
                {/* <View style={styles.cardIcon}>
                  <Ionicons name={serviceOptions[0].icon} size={32} color="#fff" />
                </View>
                <Text style={styles.cardTitle}>{serviceOptions[0].title}</Text>
                <Text style={styles.cardDescription}>
                  {serviceOptions[0].description}
                </Text> */}
                <View style={styles.arrowContainer}>
                  <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Card 2 and Card 3 in same row */}
            <View style={styles.rowContainer}>
              {serviceOptions.slice(1).map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.cardHalf}
                  onPress={() => handlePress(option)}
                >
                  <ImageBackground
                    source={option.src}
                    style={styles.cardBackground2}
                    imageStyle={styles.cardBackgroundImage2}
                  >
                    {/* <View style={styles.cardIcon}>
                      <Ionicons name={option.icon} size={28} color="#fff" />
                    </View>
                    <Text style={styles.cardTitleSmall}>{option.title}</Text>
                    <Text style={styles.cardDescriptionSmall}>
                      {option.description}
                    </Text> */}
                    <View style={styles.arrowContainer}>
                      <Ionicons
                        name="arrow-forward-circle"
                        size={22}
                        color="#fff"
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
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
    backgroundColor: "#0b0a4aff",
    paddingTop:10
  },
  sarthakbgheader: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    opacity: 5,
    zIndex: 1,
  },
  header: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 20,
  },

  cardsContainer: {
    flexDirection: "column",
  },

  /** Full width card (card 1) */
  cardFull: {
    width: "100%",
    borderRadius: 15,
    marginBottom: 20,
    minHeight: 140,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  /** Row for card 2 and card 3 */
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHalf: {
    width: "48%",
    borderRadius: 15,
    minHeight: 140,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 20,
  },

  /** Background styling for cards */
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    height:200
  },
  cardBackgroundImage: {
    borderRadius: 15,
    opacity: 0.85,  
  },
  cardBackground2: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  cardBackgroundImage2: {
    borderRadius: 15,
    opacity: 0.85,
  },

  /** Common content styles */
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardTitleSmall: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 15,
  },
  cardDescriptionSmall: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 10,
  },
  arrowContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

import { StyleSheet, Text, View, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const Quizselection = () => {
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
      title: "KBS",
      icon: "people-outline",
      description: "Kaun Banega Dharam Shiromani",
      color: "#FF6B6B",
      route: "Quiz"
    },
    {
      id: 2,
      title: "Bhajan Competition",
      icon: "pencil-outline",
      description: "Participate in our Bhajan Competition",
      color: "#4ECDC4",
      route: "Bhajan"
    },
    {
      id: 3,
      title: "Quick and fast",
      icon: "podium-outline",
      description: "Quick and fast quiz",
      color: "#b4b4b4",
      route: "Bhajan"
    },
    {
      id: 4,
      title: "Prashan Link",
      icon: "pencil-outline",
      description: "Prashan Link",
      color: "#C423B4",
      route: "Bhajan"
    },
    {
      id: 5,
      title: "Vaad-Vivad",
      icon: "trophy-outline",
      description: "Participate in Vaad-Vivad",
      color: "#A3E432",
      route: "Bhajan"
    },
    {
      id: 6,
      title: "Other Quiz",
      icon: "pencil-outline",
      description: "Participate in Other Quiz",
      color: "#A32b3C",
      route: "Bhajan"
    },
    
  ];

  const handlePress = (option) => {
    setSelectedOption(option.title);
    console.log(option.route);
    if (option.id=='1') {
      navigation.replace('Quiz');
    } else if (option.route) {
      navigation.navigate(option.route);
    } else {
      alert('This feature will be available soon!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome!  Jai Jinendra</Text>
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          style={styles.cardsContainer}
        >
          {serviceOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.card, { backgroundColor: option.color }]}
              onPress={() => handlePress(option)}
            >
              <View style={styles.cardIcon}>
                <Ionicons name={option.icon} size={32} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardDescription}>{option.description}</Text>
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward-circle" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </Animatable.View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Quizselection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfdff",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f69a4fff",
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
    color: "#fff",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "column",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    minHeight: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
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
  }
});
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const InsuranceScreen = () => {
  const navigation = useNavigation();

  const insuranceOptions = [
    {
      id: 1,
      title: "Vehicle Insurance",
      icon: "car-outline",
      description: "Protect your vehicle with comprehensive coverage",
      color: "#FF6B6B",
    },
    {
      id: 2,
      title: "Health Insurance",
      icon: "medical-outline",
      description: "Secure your health with the best coverage",
      color: "#4ECDC4",
    },
    {
      id: 3,
      title: "Life Insurance",
      icon: "shield-checkmark-outline",
      description: "Ensure your familys future security",
      color: "#45B7D1",
    },
    {
      id: 4,
      title: "Visit Website",
      icon: "globe-outline",
      description: "Explore more insurance options online",
      color: "#96CEB4",
    },
  ];

  const handleCardPress = (title) => {
    // Handle navigation or actions for each card
    alert(`${title} selected! This feature will be implemented soon.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance Services</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Choose Your Insurance Plan</Text>

        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          style={styles.cardsContainer}
        >
          {insuranceOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.card, { backgroundColor: option.color }]}
              onPress={() => handleCardPress(option.title)}
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
  );
};

export default InsuranceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1625",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#2A2438",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
  },
  scrollContent: {
    padding: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    minHeight: 180,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 15,
  },
  arrowContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});

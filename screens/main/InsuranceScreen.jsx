import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const InsuranceScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState("");

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
    if (title === "Visit Website") {
      alert("Opening website...");
      return;
    }
    setSelectedInsuranceType(title);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // Here you would handle the form submission based on selectedInsuranceType
    alert(`Inquiry for ${selectedInsuranceType} submitted!`);
    closeModal();
  };

  const renderFormFields = () => {
    // These are common fields for all forms
    const commonFields = (
      <>
        <Text style={styles.formLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.formLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
        />
        <Text style={styles.formLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
      </>
    );

    // Conditional rendering for specific fields
    switch (selectedInsuranceType) {
      case "Vehicle Insurance":
        return (
          <>
            {commonFields}
            <Text style={styles.formLabel}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your vehicle number"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.formLabel}>RC Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your RC number"
              placeholderTextColor="#aaa"
            />
          </>
        );
      case "Health Insurance":
        return (
          <>
            {commonFields}
            <Text style={styles.formLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Your age"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
            />
            <Text style={styles.formLabel}>Number of Family Members</Text>
            <TextInput
              style={styles.input}
              placeholder="Number of members to be covered"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
            />
          </>
        );
      case "Life Insurance":
        return (
          <>
            {commonFields}
            <Text style={styles.formLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Your age"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
            />
            <Text style={styles.formLabel}>Desired Coverage Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., $100,000"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </>
        );
      default:
        return commonFields;
    }
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animatable.View
                animation="fadeInUp"
                duration={500}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Inquire about {selectedInsuranceType}
                  </Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close-circle-outline" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.formScrollView}>
                  <View style={styles.formContainer}>
                    {renderFormFields()}
                    <Text style={styles.formLabel}>Message (Optional)</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Tell us what you need"
                      placeholderTextColor="#aaa"
                      multiline
                      numberOfLines={4}
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.submitButtonText}>Submit Inquiry</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#2A2438",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%", // Added to prevent modal from going off-screen on smaller devices
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    maxWidth: "85%",
  },
  formScrollView: {
    maxHeight: 400, // Added to make the form scrollable if it gets too long
  },
  formContainer: {
    width: "100%",
  },
  formLabel: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#1A1625",
    color: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#4A455A",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#4ECDC4",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#1A1625",
    fontSize: 18,
    fontWeight: "bold",
  },
});
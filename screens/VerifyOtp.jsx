import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from 'firebase/auth';
import { useAuth } from "../components/context/AuthContext";

export default function VerifyOtp({ route, navigation }) {
  const { confirmation, userData, isTestMode } = route.params;
  const { signUp } = useAuth();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert("Missing OTP", "Please enter the OTP sent to your phone.");
      return;
    }

    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifying(true);

    try {
      let result;
      
      if (isTestMode) {
        // For test mode, accept any 6-digit OTP
        console.log("Test mode: OTP verification bypassed");
        result = {
          user: {
            uid: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          }
        };
      } else {
        // Step 1: Confirm the OTP with Firebase
        result = await confirmation.confirm(otp);
        console.log("Phone number verified!", result.user.uid);
      }

      // Step 2: Save user details in your database
      const signUpResult = await signUp({
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.username,
        phone: userData.phone,
        email: userData.email || `${userData.username}@example.com`, // Use email or create a default one
        uid: result.user.uid,
        phoneVerified: true,
        createdAt: new Date().toISOString(),
      });

      if (!signUpResult.success) {
        Alert.alert("Error", signUpResult.error || "Failed to create profile.");
        return;
      }

      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Selection");
    } catch (error) {
      console.error("OTP verification error:", error);
      let errorMessage = "Verification failed. Please try again.";
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP. Please check and try again.";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = "OTP has expired. Please request a new one.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }
      
      Alert.alert("Verification Failed", errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      if (isTestMode) {
        // For test mode, just show a message
        Alert.alert("Test Mode", "In test mode, you can use any 6-digit OTP to continue.");
      } else {
        const formattedPhone = "+91" + userData.phone;
        const auth = getAuth();
        
        // For production, you would implement proper reCAPTCHA here
        // For now, we'll show a message
        Alert.alert("Resend OTP", "OTP resend functionality will be implemented for production.");
      }
      
      // Start cooldown timer
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Resend OTP error:", error);
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          {isTestMode 
            ? "Enter any 6-digit OTP to continue (Test Mode)" 
            : "Enter the 6-digit OTP sent to your phone number"
          }
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="key-outline"
            size={24}
            color="#bbb"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#bbb"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
        </View>

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyOtp}
          disabled={isVerifying}
        >
          <Text style={styles.verifyButtonText}>
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resendButton, resendCooldown > 0 && styles.resendButtonDisabled]}
          onPress={handleResendOtp}
          disabled={isResending || resendCooldown > 0}
        >
          <Text style={[styles.resendButtonText, resendCooldown > 0 && styles.resendButtonTextDisabled]}>
            {isResending 
              ? "Sending..." 
              : resendCooldown > 0 
                ? `Resend OTP (${resendCooldown}s)` 
                : "Resend OTP"
            }
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1625",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2438",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 15,
  },
  verifyButton: {
    backgroundColor: "#9333EA",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#9333EA",
  },
  resendButtonDisabled: {
    borderColor: "#666",
  },
  resendButtonText: {
    color: "#9333EA",
    fontSize: 16,
    fontWeight: "500",
  },
  resendButtonTextDisabled: {
    color: "#666",
  },
});

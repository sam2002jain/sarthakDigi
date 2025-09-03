import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../components/context/AuthContext';


export default function SignupScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {signUp} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('Missing info', 'Please enter email, password, and username.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // First try to create the profile to check username availability
      const signUpResult = await signUp({ 
        firstname, 
        lastname, 
        username: username.toLowerCase(), 
        email: email.trim() 
      });

      if (!signUpResult.success) {
        Alert.alert('Sign up failed', signUpResult.error);
        return;
      }

      // If profile creation successful, create auth user
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Selection');
    } catch (err) {
      Alert.alert('Sign up failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#9381c6ff" }}>
        <ScrollView>
          <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Hey! Let's get started</Text>

            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => navigation.navigate("Auth")}
              >
                <Text style={styles.toggleText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, styles.activeToggle]}
              >
                <Text style={[styles.toggleText, styles.activeText]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="First name"
                  placeholderTextColor="#bbb"
                  value={firstname}
                  onChangeText={setFirstname}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  placeholderTextColor="#bbb"
                  value={lastname}
                  onChangeText={setLastname}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color="#bbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Choose a username"
                placeholderTextColor="#bbb"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={24}
                color="#bbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#bbb"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#bbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Create a password (min 8 characters)"
                placeholderTextColor="#bbb"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#bbb"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#bbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#bbb"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#bbb"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signUpButton} disabled={isSubmitting} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>{isSubmitting ? 'Creating...' : 'Sign Up'}</Text>
      </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1A1625",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 50,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#9333EA",
    borderRadius: 8,
  },
  toggleText: {
    color: "#fff",
    fontSize: 16,
  },
  activeText: {
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2438",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 15,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#9333EA",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

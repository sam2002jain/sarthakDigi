import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground } from 'react-native';
import Logo from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen() {
    const navigation = useNavigation();
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#9381c6ff' }}>
      <ScrollView>
      <ImageBackground
        source={require('../assets/bg.jpeg')}
        style={styles.container}
        resizeMode="cover"
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={{ flex: 1 }}>
        <Logo style={styles.logo} />
        <Text style={styles.title}>Your Personal Consciousness Assistant</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity 
          style={[styles.toggleButton, isSignIn && styles.activeToggle]}
          onPress={() => setIsSignIn(true)}
          >
          <Text style={[styles.toggleText, isSignIn && styles.activeText]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.toggleButton, !isSignIn && styles.activeToggle]}
          onPress={() => navigation.navigate('Signup')}
          >
          <Text style={[styles.toggleText, !isSignIn && styles.activeText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your email and we'll send you a reset link</Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#bbb" style={styles.inputIcon} />
          <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#bbb"
          />
        </View>


        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('Auth')}>
          <Text style={styles.forgotPassword}>Back to SignIn</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
      </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1625',
  },
  logo: {
    alignSelf: 'center',
    marginTop: 30,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#9333EA',
    borderRadius: 8,
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
  },
  activeText: {
    color: '#fff',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2438',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    padding: 15,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#9333EA',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#9333EA',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});


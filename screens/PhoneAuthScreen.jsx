import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { signInWithPhoneNumber, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { auth, firebaseConfig } from '../firebase';
import { useAuth } from '../components/context/AuthContext';

export default function PhoneAuthScreen({ route, navigation }) {
  const { userData } = route.params || {}; // Should contain firstname, lastname, username, email, password
  const { signUp } = useAuth();
  const recaptchaVerifier = useRef(null);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  const sendOTP = async () => {
    if (!phone.trim()) return Alert.alert('Error', 'Please enter your phone number');

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) return Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit Indian mobile number');

    setIsSendingOTP(true);
    try {
      const formattedPhone = '+91' + phone;
      const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier.current);
      setConfirmationResult(result);
      setShowCodeInput(true);
      Alert.alert('OTP Sent', 'Please check your SMS for the verification code');
    } catch (err) {
      console.error('Error sending OTP:', err);
      Alert.alert('Error', err.message || 'Failed to send OTP');
    } finally {
      setIsSendingOTP(false);
    }
  };

  const confirmCode = async () => {
    if (!code.trim()) return Alert.alert('Error', 'Please enter the verification code');
    if (code.length !== 6) return Alert.alert('Error', 'Please enter a valid 6-digit code');

    setIsVerifying(true);
    try {
      if (!confirmationResult) throw new Error('No confirmation result. Please send OTP first.');

      const userCredential = await confirmationResult.confirm(code);
      const user = userCredential.user;
      console.log('Phone verified successfully:', user.uid);

      // 1️⃣ Link email/password
      if (userData.email && userData.password) {
        try {
          const credential = EmailAuthProvider.credential(userData.email, userData.password);
          await linkWithCredential(user, credential);
          console.log('Email/password linked successfully!');
        } catch (linkError) {
          console.error('Error linking email/password:', linkError);
          Alert.alert('Linking Error', linkError.message || 'Failed to link email/password');
          return;
        }
      }

      // 2️⃣ Create Firestore profile
      if (userData) {
        const signUpResult = await signUp({
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          phone: phone.trim(),
          email: userData.email,
          uid: user.uid,
          phoneVerified: true,
          createdAt: new Date().toISOString(),
        });

        if (!signUpResult.success) {
          Alert.alert('Error', signUpResult.error || 'Failed to create profile');
          return;
        }

        Alert.alert('Success', 'Account created successfully! You can now login with email/password.');
        navigation.replace('Auth'); // Navigate to email/password login screen
      }
    } catch (err) {
      console.error('Error verifying code:', err);
      Alert.alert('Verification Failed', err.message || 'Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOTP = () => {
    setCode('');
    setShowCodeInput(false);
    setConfirmationResult(null);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Phone Verification</Text>
          <Text style={styles.subtitle}>
            {showCodeInput 
              ? 'Enter the 6-digit code sent to your phone'
              : 'Enter your phone number to receive OTP'
            }
          </Text>

          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={true}
          />

          {!showCodeInput ? (
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={24} color="#bbb" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your 10-digit mobile number"
                placeholderTextColor="#bbb"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Ionicons name="key-outline" size={24} color="#bbb" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#bbb"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                maxLength={6}
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={showCodeInput ? confirmCode : sendOTP}
            disabled={isSendingOTP || isVerifying}
          >
            <Text style={styles.primaryButtonText}>
              {isSendingOTP 
                ? 'Sending OTP...' 
                : isVerifying 
                  ? 'Verifying...' 
                  : showCodeInput 
                    ? 'Verify Code' 
                    : 'Send OTP'
              }
            </Text>
          </TouchableOpacity>

          {showCodeInput && (
            <TouchableOpacity style={styles.secondaryButton} onPress={resendOTP} disabled={isSendingOTP}>
              <Text style={styles.secondaryButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back to Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1625' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 30 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { color: '#aaa', fontSize: 16, textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2A2438', borderRadius: 8, paddingHorizontal: 15, marginBottom: 20 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16, paddingVertical: 15 },
  primaryButton: { backgroundColor: '#9333EA', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: 'transparent', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#9333EA' },
  secondaryButtonText: { color: '#9333EA', fontSize: 16, fontWeight: '500' },
  backButton: { alignItems: 'center', marginTop: 20 },
  backButtonText: { color: '#aaa', fontSize: 16 },
});

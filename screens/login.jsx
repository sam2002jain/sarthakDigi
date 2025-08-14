import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, StatusBar } from 'react-native';
import Logo from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#1A1625' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../assets/bg.jpeg')}
                    style={styles.container}
                    resizeMode="cover"
                    imageStyle={{ opacity: 0.2 }}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.content}>
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

                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail-outline" size={24} color="#bbb" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#bbb"
                                    keyboardType="email-address"
                                />
                            </View>

                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={24} color="#bbb" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#bbb"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#bbb" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.signInButton} onPress={() => navigation.replace('MainApp')}>
                                <Text style={styles.signInButtonText}>Sign In</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
                                <Text style={styles.forgotPassword}>Forgot your password?</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Make the background fill the available space
        backgroundColor: '#1A1625',
    },
    // New style for the ScrollView's content
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Center the content vertically
        padding: 20, // Add padding here instead of the container
    },
    content: {
        // This view wraps your form elements
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20, // Adjusted margin
    },
    title: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
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
        paddingVertical: 15, // Use paddingVertical to avoid conflict with container
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
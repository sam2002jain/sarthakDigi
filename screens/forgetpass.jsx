import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ActivityIndicator, Alert, StatusBar } from 'react-native';
import Logo from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState('');

    const emailsend = async () => {
        if (!email) {
            Alert.alert('Missing email', 'Please enter your email address.');
            return;
        }
        try {
            setSent(true);
            await sendPasswordResetEmail(auth, email.trim());
            Alert.alert('Link sent', 'Please check your junk or spam in your email.');
            
            navigation.navigate('Auth');
        } catch (err) {
            Alert.alert('Reset failed', err.message);
        } finally {
            setSent(false);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: '#9381c6ff' }}>
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
                            <Text style={styles.title}>We're here for you</Text>
                            <Text style={styles.title}>Reset Password</Text>
                            <Text style={styles.subtitle}>Enter your email and we'll send you a reset link</Text>

                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail-outline" size={24} color="#bbb" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#bbb"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <TouchableOpacity style={styles.signInButton} onPress={emailsend}>
                                {sent && <ActivityIndicator />}
                                {!sent && <Text style={styles.signInButtonText}>Send Reset Link</Text>}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
                                <Text style={styles.forgotPassword}>Back to SignIn</Text>
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
        flex: 1,
        backgroundColor: '#1A1625',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    content: {
        // You might need to adjust some spacing here if the content looks too crammed
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
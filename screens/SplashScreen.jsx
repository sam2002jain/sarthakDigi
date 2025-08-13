import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import React,{ useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect (()=>{
        setTimeout(()=>{
            navigation.replace('Auth');
        }, 3000);
    },[]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground style={styles.splashContainer}  resizeMode="cover"
         source={require('../assets/splashbg.jpeg')}>
        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          style={styles.logoContainer}
        >
          <Ionicons name="sparkles" size={80} color="#d695eaff" />
          <Animatable.Text
            animation="fadeInLeft"
            delay={1500}
            style={styles.splashText}
          >
            Rama's 360 OS™
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInRight"
            delay={1500}
            style={styles.splashsubText}
          >
            The Remembering Interface
          </Animatable.Text>
        </Animatable.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#faf6f6ff',
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity:1
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    fontFamily: 'Courier New',
  },
  splashsubText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    fontFamily: 'Courier New',
  },
});
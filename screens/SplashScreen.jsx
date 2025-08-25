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
      <View style={styles.splashContainer}>
        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          style={styles.logoContainer}
        >
          <Ionicons name="sparkles" size={80} color="rgb(95, 47, 109)" />
          <Animatable.Text
            animation="fadeInLeft"
            delay={1500}
            style={styles.splashText}
          >
            Sarthak Digital
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInRight"
            delay={1500}
            style={styles.splashsubText}
          >
            Name of Perfection
          </Animatable.Text>
        </Animatable.View>
        </View>
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
    opacity:0.7
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    fontFamily: 'Courier New',
  },
  splashsubText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    fontFamily: 'Courier New',
  },
});
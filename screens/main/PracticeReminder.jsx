import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, ImageBackground   } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';



const PracticeReminder = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.safeArea}>
          {/* Main Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Practice Reminder</Text>
            </View>
          </View>

          <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.background}>
          <View>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
          </View>

          </ImageBackground>
    </SafeAreaView>
  )
}

export default PracticeReminder

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#383e58', // Dark background to match the image's top bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 45, // Add more padding for the status bar area
    backgroundColor: '#3d424dff',
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    top: 45,
    padding: 5,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
    background: {
    flex: 1,
    resizeMode: 'cover',
    opacity:0.8,
  },
})
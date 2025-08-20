import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function BhajanScreen ( props ){
    return(
        <SafeAreaView style={styles.safeArea}>
      {/* Main Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Bhajan Writing</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to the Bhajan Screen!</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
    )
};
export default BhajanScreen;

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: '#383e58', // Dark background to match the image's top bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 25, // Add more padding for the status bar area
    backgroundColor: '#3d424dff',
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    top: 20,
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
  content:{
    alignItems:'center',
    padding:5
  },
  contentText:{
    color:'#ffff',
    fontSize:16,
  },
})
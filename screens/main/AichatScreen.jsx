import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


function HomeScreen(props) {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1}}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>



      <Text style={styles.welcometext}>Hello Rama</Text>
    </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9a8bc4ff',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#050000ff',
    borderRadius: 50,
    elevation: 5,
  },
  welcometext:{
    fontSize: 36,
    color: '#dedb85ff',
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  }
});
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


const CommunityHub = (props) => {
  const { navigation } = props;
  return (
   <SafeAreaView style={{ flex: 1}}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text>Community Hub</Text>
    </View>
    </SafeAreaView>
  )
}

export default CommunityHub;

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
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
})
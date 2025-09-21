import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

const ManchEkParichayScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Manch Ek Parichay</Text>
    </SafeAreaView>
  )
}

export default ManchEkParichayScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1625', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
})

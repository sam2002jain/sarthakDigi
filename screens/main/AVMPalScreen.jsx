import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'

const AVMPalScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>AVM Pal</Text>
    </SafeAreaView>
  )
}

export default AVMPalScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1625', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
})

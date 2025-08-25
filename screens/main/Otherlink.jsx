import React, { useCallback } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const socialLinks = [
  {
    label: 'Instagram',
    subtitle: '@sarthakdigital',
    icon: 'logo-instagram',
    color: '#C13584',
    url: 'https://instagram.com/sarthakdigital',
  },
  {
    label: 'Twitter',
    subtitle: '@sarthakdigital',
    icon: 'logo-twitter',
    color: '#1DA1F2',
    url: 'https://twitter.com/sarthakdigital',
  },
  {
    label: 'Facebook',
    subtitle: 'Sarthak Digital',
    icon: 'logo-facebook',
    color: '#1877F2',
    url: 'https://facebook.com/sarthakdigital',
  },
  {
    label: 'Blog',
    subtitle: 'Latest updates and articles',
    icon: 'newspaper-outline',
    color: '#34D399',
    url: 'https://blog.sarthakdigital.com',
  },
]

const Otherlink = () => {
  const openLink = useCallback(async (url) => {
    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert('Unable to open link', 'No app found to open this URL.')
      }
    } catch (e) {
      Alert.alert('Something went wrong', 'Please try again later.')
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Stay connected</Text>
          <Text style={styles.subtitle}>Follow Sarthak Digital across platforms</Text>
        </View>

        <View style={styles.cards}>
          {socialLinks.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.card} activeOpacity={0.85} onPress={() => openLink(item.url)}>
              <View style={[styles.iconWrap, { backgroundColor: item.color + '22' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{item.label}</Text>
                {!!item.subtitle && <Text style={styles.cardSubtitle}>{item.subtitle}</Text>}
              </View>
              <Ionicons name="open-outline" size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Otherlink

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1625',
  },
  content: {
    padding: 20,
  },
  header: {
    marginTop:12,
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#C7C9D1',
    marginTop: 6,
    fontSize: 14,
  },
  cards: {
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2438',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#A5A8B6',
    fontSize: 12,
    marginTop: 4,
  },
})
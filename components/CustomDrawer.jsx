import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';

export default function CustomDrawer(props) {
  const { navigation } = props;

  const menuItems = [
    { name: 'AI Chat', icon: 'chatbubble-outline', screen: 'AI Chat' },
    { name: 'Practice Reminders', icon: 'notifications-outline', screen: 'Practice' },
    { name: 'Reflection Journal', icon: 'book-outline', screen: 'Reflection' },
    { name: 'Community Hub', icon: 'people-outline', screen: 'Community' },
    { name: 'Zoom Sessions', icon: 'videocam-outline', screen: 'Zoom' },
  ];

  const bottomMenuItems = [
    { name: 'My Profile', icon: 'person-outline', screen: 'Profile' },
    { name: 'Settings', icon: 'settings-outline', screen: 'Setting' },
    { name: 'Logout', icon: 'log-out-outline', screen: 'Auth' },
  ];

  return (
    <SafeAreaView style={{ flex: 1}}>
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
           <Logo width={30} height={25} />
          <Text style={styles.brandText}>Solingnita™</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={24} color="#fff" />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.upgradeContainer}>
          <Text style={styles.trialText}>Free trial: 0 days left</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomMenu}>
          {bottomMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={24} color="#fff" />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1625',
  },
  scrollContent: {
    flex: 0,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '600',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 20,
  },
  menuText: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 16,
  },
  upgradeContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#2A2438',
    borderRadius: 10,
  },
  trialText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  upgradeButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomMenu: {
    borderTopWidth: 1,
    borderTopColor: '#2A2438',
    paddingTop: 20,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import { useAuth } from '../components/context/AuthContext';


export default function CustomDrawer(props) {
  const { navigation } = props;
  const { logout } = useAuth();

  const bottomMenu = (name) => {
    const screen = bottomMenuItems.find(item => item.name === name)?.screen;
    if (screen === 'Auth') {
      logout();
      navigation.navigate(screen);
    }
    else if (screen) {
      navigation.navigate(screen);
    }
  };


  const menuItems = [
    { name: 'Prabhavna Manch', icon: 'chatbubble-outline', screen: 'Prabhavna' },
    { name: 'Swadhyay Manch', icon: 'people-outline', screen: 'Swadhyay' },
    // { name: 'Bhajan Writing', icon: 'pencil-outline', screen: 'Bhajan' },
    { name: 'Quiz', icon: 'hourglass-outline', screen: 'Quizselection' },
  ];

  const bottomMenuItems = [
     { name: 'MainMenu', icon: 'menu-outline', screen: 'Selection' },
    { name: 'My Profile', icon: 'person-outline', screen: 'Profile' },
    { name: 'Other Links', icon: 'link-outline', screen: 'Otherlink' },
    { name: 'Logout', icon: 'log-out-outline', screen: 'Auth' },
  ];

  return (
    <SafeAreaView style={{ flex: 1}}>
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
           <Logo width={30} height={25} />
          <Text style={styles.brandText}>Sarthak Digital™</Text>
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
              onPress={() => bottomMenu(item.name)}
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

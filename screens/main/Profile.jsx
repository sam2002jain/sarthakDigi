import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Profile = (props) => {
  const { navigation } = props
  const { width } = useWindowDimensions()

  const rs = (n) => Math.round((width / 375) * n) 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: rs(40) }}>
        {/* Header */}
        <View style={[styles.header, { paddingVertical: rs(30) }]}>
          <TouchableOpacity
            style={[styles.menuButton, { left: rs(15) }]}
            onPress={() => navigation.openDrawer()}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={rs(26)} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: rs(18) }]}>Profile</Text>
        </View>

        {/* Profile Avatar */}
        <View style={{ alignItems: 'center', marginTop: rs(24) }}>
          <View
            style={{
              height: rs(120),
              width: rs(120),
              borderRadius: rs(60),
              borderWidth: 2,
              borderColor: '#6B46C1',
              backgroundColor: '#4C1D95',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: rs(34), fontWeight: '700' }}>SJ</Text>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: rs(22), fontWeight: '700', marginTop: rs(12) }}>SANYAM JAIN</Text>
          <Text style={{ color: '#A5A8B6', fontSize: rs(14), marginTop: rs(6) }}>@Sam2002</Text>
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: rs(16), gap: rs(12) }}>
          {/* <TouchableOpacity style={[styles.actionBtn, { paddingVertical: rs(10), paddingHorizontal: rs(14) }]}
            activeOpacity={0.9}
            onPress={() => {}}
          >
            <Ionicons name="create-outline" size={rs(18)} color="#FFFFFF" />
            <Text style={[styles.actionText, { marginLeft: rs(8), fontSize: rs(14) }]}>Edit Profile</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.actionBtnAlt, { paddingVertical: rs(10), paddingHorizontal: rs(14) }]}
            activeOpacity={0.9}
            onPress={() => {}}
          >
            <Ionicons name="shield-checkmark-outline" size={rs(18)} color="#6B46C1" />
            <Text style={[styles.actionTextAlt, { marginLeft: rs(8), fontSize: rs(14) }]}>Privacy</Text>
          </TouchableOpacity>
        </View>

        {/* Info Cards */}
        <View style={{ paddingHorizontal: rs(20), marginTop: rs(20) }}>
          <View style={[styles.card, { padding: rs(14), borderRadius: rs(14), marginBottom: rs(12) }]}>
            <Text style={[styles.cardLabel, { fontSize: rs(12) }]}>Username</Text>
            <View style={styles.cardRow}>
              <Text style={[styles.cardValue, { fontSize: rs(16) }]}>Sam2002</Text>
              <Ionicons name="person-circle-outline" size={rs(20)} color="#94A3B8" />
            </View>
          </View>

          <View style={[styles.card, { padding: rs(14), borderRadius: rs(14), marginBottom: rs(12) }]}>
            <Text style={[styles.cardLabel, { fontSize: rs(12) }]}>Email</Text>
            <View style={styles.cardRow}>
              <Text style={[styles.cardValue, { fontSize: rs(16) }]}>sanyamjainit@gmail.com</Text>
              <Ionicons name="mail-outline" size={rs(20)} color="#94A3B8" />
            </View>
          </View>

          <View style={[styles.card, { padding: rs(14), borderRadius: rs(14) }]}>
            <Text style={[styles.cardLabel, { fontSize: rs(12) }]}>Membership</Text>
            <View style={styles.cardRow}>
              <Text style={[styles.cardValue, { fontSize: rs(16) }]}>Free plan</Text>
              <TouchableOpacity style={{ paddingVertical: rs(6), paddingHorizontal: rs(10), backgroundColor: '#2563EB', borderRadius: rs(8) }}>
                <Text style={{ color: '#FFFFFF', fontSize: rs(12), fontWeight: '600' }}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings Group */}
        <View style={{ paddingHorizontal: rs(20), marginTop: rs(18) }}>
          {[
            { icon: 'lock-closed-outline', label: 'Security' },
            { icon: 'help-circle-outline', label: 'Help & Support' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={[styles.listItem, { paddingVertical: rs(14) }]} activeOpacity={0.8}>
              <View style={[styles.listIconWrap, { width: rs(36), height: rs(36), borderRadius: rs(8) }]}> 
                <Ionicons name={item.icon} size={rs(18)} color="#C8B6FF" />
              </View>
              <Text style={[styles.listLabel, { fontSize: rs(15) }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={rs(18)} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1625',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2438',
    paddingHorizontal: 16,
  },
  menuButton: {
    position: 'absolute',
  },
  headerTitle: {
    color: '#E5E7EB',
    fontWeight: '700',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B46C1',
    borderRadius: 10,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionBtnAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2438',
    borderRadius: 10,
  },
  actionTextAlt: {
    color: '#C8B6FF',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#2A2438',
  },
  cardLabel: {
    color: '#9CA3AF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardValue: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2438',
  },
  listIconWrap: {
    backgroundColor: '#3B2C59',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listLabel: {
    color: '#FFFFFF',
    flex: 1,
  },
})
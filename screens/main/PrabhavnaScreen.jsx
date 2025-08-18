import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../components/Logo';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen(props) {
  const { navigation } = props;
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3d424dff" />

      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>consciousness assistant™</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeMessage}>
          <Logo width={50} height={50} alignSelf='center' />
          <Text style={styles.chatPlaceholder}>Hello Rama</Text>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <SafeAreaView style={styles.inputSafeArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Message consciousness assistant™"
              placeholderTextColor="#A9A9A9"
              value={inputText}
              onChangeText={setInputText}
              multiline
              keyboardType='default'
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                if (inputText.trim().length > 0) {
                  console.log('Send message:', inputText);
                  setInputText('');
                }
              }}
            >
              <Ionicons name="send" size={24} color="#d0acf3ff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35383f',
  },
  headerSafeArea: {
    paddingTop: 22,
    backgroundColor: '#3d424dff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4b4f57',
  },
  menuButton: {
    position: 'absolute',
    left: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: '#dcdcdc',
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    // Container for your welcome message
  },
  chatPlaceholder: {
    fontSize: 36,
    color: '#c99cf2ff',
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    textAlign: 'center',
    marginTop: 10,
  },
  keyboardAvoidingView: {
    backgroundColor: '#35383f',
  },
  inputSafeArea: {
    backgroundColor: '#35383f',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#4b4f57',
    borderRadius: 25,
    margin: 15,
    padding: 8,
  },
  textInput: {
    flex: 1,
    color: '#dcdcdc',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    maxHeight: 120,
    minHeight: 40,
  },
  sendButton: {
    backgroundColor: '#6c6f78',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
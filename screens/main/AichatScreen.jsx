import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../components/Logo';

function HomeScreen(props) {
  const { navigation } = props;
  const [inputText, setInputText] = useState('');

  // React.useEffect(() => {
  //   const backAction = () => {
  //     return true; 
  //   };

  //   const subscription = navigation.addListener('beforeRemove', (e) => {
  //     if (e.data.action.type === 'GO_BACK') {
  //       e.preventDefault();
  //       backAction();
  //     }
  //   });

  //   return subscription;
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>consciousness assistant™</Text>
      </View>

      {/* This is where your chat messages would go */}
      <View style={styles.chatContainer}>
        <Logo width={50} height={50} />
        <Text style={styles.chatPlaceholder}>Hello Rama</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
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
          <TouchableOpacity style={styles.sendButton} onPress={() => console.log('Send message:', inputText)}>
            <Ionicons name="send" size={24} color="#d0acf3ff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#35383f', // Darker, more professional background
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
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center', // Center the placeholder text
    alignItems: 'center', // Center the placeholder text
  },
  chatPlaceholder: {
    fontSize: 36,
    color: '#c99cf2ff',
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    paddingBottom: 15, // Adds a margin at the very bottom
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Aligns items to the bottom
    backgroundColor: '#4b4f57',
    borderRadius: 25, // Rounded corners for the container
    marginHorizontal: 15,
    padding: 8,
    bottom:'8%'
  },
  textInput: {
    flex: 1,
    color: '#dcdcdc',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingTop: 12, // More padding for better text alignment
    paddingBottom: 12,
    maxHeight: 120, // Prevents the input from getting too tall
  },
  sendButton: {
    backgroundColor: '#6c6f78', // A slightly different button color
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8, // Space between text input and button
  },
});
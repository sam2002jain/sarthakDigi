import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert, // Added Alert for feedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// NOTE: You would need to install a library like 'react-native-image-picker' or 'expo-image-picker'
// and 'firebase' or a similar service for actual upload.
// This is a placeholder for the import:
 import * as ImagePicker from 'expo-image-picker'; // Example for Expo

function BhajanScreen(props) {
  const { navigation } = props; // Assuming navigation prop is available for openDrawer
  const [bhajanText, setBhajanText] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  // Placeholder function for image picking
  const handleImagePick = async () => {
    // 1. Request permissions (if necessary, depends on the library)
    // 2. Launch the image library
    // 3. Set the URI to state or proceed with upload
    
    // --- Mock Logic (Replace with actual image picker logic) ---
    // If you are using expo-image-picker:
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri);
      console.log('Image URI:', result.assets[0].uri);
      Alert.alert('Image Selected', 'Ready to Upload!');
    }
    
    // --- End Mock Logic ---
    Alert.alert('Image Pick', 'Image picker logic not implemented yet. Install and configure a library like react-native-image-picker.');
  };

  const handleUpload = async () => {
    if (!bhajanText.trim() && !selectedImageUri) {
      Alert.alert('Error', 'Please write a bhajan or select an image to upload.');
      return;
    }

    // This is where you'd implement the actual API/Firebase/backend upload logic.
    // You would typically use the bhajanText and selectedImageUri for the upload.

    Alert.alert('Upload Initiated', 'Bhajan: "' + bhajanText.substring(0, 20) + '..." | Image: ' + (selectedImageUri ? 'Selected' : 'None'));

    // Reset state after assumed successful upload
    // setBhajanText('');
    // setSelectedImageUri(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main Header */}
      <View style={styles.header}>
        {/* Check if navigation is available before calling openDrawer */}
        {navigation?.openDrawer && (
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Bhajan Writing</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Write your Bhajan below:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Start writing your prayer or devotional song here..."
            placeholderTextColor="#aaa"
            value={bhajanText}
            onChangeText={setBhajanText}
          />
          <Text style={styles.contentText}>--- OR ---</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Ionicons name="image" size={20} color="#fff" />
            <Text style={styles.buttonText}>Select Image ({selectedImageUri ? '1' : '0'})</Text>
          </TouchableOpacity>

          {selectedImageUri && (
            <Text style={styles.imageInfo}>Image selected: {selectedImageUri.substring(selectedImageUri.lastIndexOf('/') + 1)}</Text>
          )}

          <TouchableOpacity
            style={[styles.uploadButton, styles.submitButton]}
            onPress={handleUpload}
            disabled={!bhajanText.trim() && !selectedImageUri} // Disable if no text or image
          >
            <Ionicons name="cloud-upload" size={20} color="#fff" />
            <Text style={styles.buttonText}>Submit Bhajan / Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BhajanScreen;

// ---
// Styles
// ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#383e58', // Dark background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#3d424dff',
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    top: 25,
    padding: 5,
    zIndex: 1, // Ensure the button is tappable
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  contentText: {
    color: '#ffff',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: 150,
    backgroundColor: '#2e3346',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'top', // For Android multi-line alignment
    borderWidth: 1,
    borderColor: '#5c6380',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50', // Green button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    minWidth: 200,
  },
  submitButton: {
    backgroundColor: '#007bff', // Blue button for submission
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageInfo: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  }
});
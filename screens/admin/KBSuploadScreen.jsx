import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const KBSuploadScreen = () => {
  const navigation = useNavigation();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const { logout } = useAuth();

  const  handlelogout  = async ()=>{
    await logout();
    navigation.replace('Auth');

  }

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        await processExcelFile(file.uri);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const processExcelFile = async (fileUri) => {
    try {
      setIsUploading(true);
      setUploadProgress('Reading Excel file...');

      // Read the file
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert base64 to binary
      const binaryString = atob(fileContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Parse Excel
      const workbook = XLSX.read(bytes, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setUploadProgress('Processing quiz data...');
      const quizData = parseExcelData(jsonData);

      setUploadProgress('Uploading to Firestore...');
      await uploadToFirestore(quizData);

      Alert.alert('Success', `Successfully uploaded ${quizData.length} quiz groups!`);
    } catch (error) {
      console.error('Error processing Excel:', error);
      Alert.alert('Error', 'Failed to process Excel file');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const parseExcelData = (jsonData) => {
    const quizGroups = {};
    
    jsonData.forEach((row, index) => {
      if (row.length < 7) return; // Skip incomplete rows
      
      const [group, questionNum, question, option1, option2, option3, option4, correctAnswer] = row;
      
      if (!group || !question) return; // Skip empty rows
      
      if (!quizGroups[group]) {
        quizGroups[group] = {
          groupId: group,
          groupName: `Group ${group}`,
          questions: []
        };
      }
      
      const questionData = {
        questionId: `${group}_${questionNum}`,
        questionNumber: parseInt(questionNum) || 1,
        question: question.toString().trim(),
        options: [
          option1?.toString().trim() || '',
          option2?.toString().trim() || '',
          option3?.toString().trim() || '',
          option4?.toString().trim() || ''
        ].filter(opt => opt), // Remove empty options
        correctAnswer: correctAnswer?.toString().trim() || '',
        correctAnswerIndex: -1 // Will be calculated
      };
      
      // Find correct answer index
      questionData.correctAnswerIndex = questionData.options.findIndex(
        option => option === questionData.correctAnswer
      );
      
      quizGroups[group].questions.push(questionData);
    });
    
    return Object.values(quizGroups);
  };

  const uploadToFirestore = async (quizData) => {
    try {
      const batch = writeBatch(db);
      const quizzesRef = collection(db, 'Quizzes');
      
      for (const group of quizData) {
        const docRef = doc(quizzesRef, group.groupId);
        batch.set(docRef, {
          ...group,
          createdAt: new Date(),
          totalQuestions: group.questions.length
        });
      }
      
      await batch.commit();
    } catch (error) {
      console.error('Error uploading to Firestore:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Upload Quiz Excel File</Text>
        <Text style={styles.subtitle}>
          Select an Excel file to upload quiz questions to Firestore
        </Text>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Excel Format:</Text>
          <Text style={styles.instructionText}>
            • Column A: Group (A, B, C, etc.)
          </Text>
          <Text style={styles.instructionText}>
            • Column B: Question Number
          </Text>
          <Text style={styles.instructionText}>
            • Column C: Question Text
          </Text>
          <Text style={styles.instructionText}>
            • Columns D-G: Answer Options
          </Text>
          <Text style={styles.instructionText}>
            • Column H: Correct Answer
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]} 
          onPress={pickDocument}
          disabled={isUploading}
        >
          <Text style={styles.uploadButtonText}>
            {isUploading ? 'Processing...' : 'Select Excel File'}
          </Text>
        </TouchableOpacity>

        {isUploading && (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="small" color="#9333EA" />
            <Text style={styles.progressText}>{uploadProgress}</Text>
          </View>
        )}

        <TouchableOpacity onPress={handlelogout}>
          <Text style={{color:'#ffff'}}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KBSuploadScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1A1625' 
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: { 
    color: '#FFFFFF', 
    fontSize: 24, 
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22
  },
  instructionsContainer: {
    backgroundColor: '#2A2438',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%'
  },
  instructionsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15
  },
  instructionText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20
  },
  uploadButton: {
    backgroundColor: '#9333EA',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20
  },
  uploadButtonDisabled: {
    backgroundColor: '#666666'
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  progressText: {
    color: '#CCCCCC',
    marginLeft: 10,
    fontSize: 14
  }
});

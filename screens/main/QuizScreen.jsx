import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- 1. GAME DATA: Sample Jainism Questions ---
const JAIN_QUESTIONS = [
  {
    question: 'जैन धर्म के प्रथम तीर्थंकर कौन थे?',
    options: ['पार्श्वनाथ', 'महावीर स्वामी', 'ऋषभदेव', 'नेमिनाथ'],
    answer: 'ऋषभदेव',
  },
  {
    question: 'भगवान महावीर का जन्म स्थान कहाँ है?',
    options: ['बोधगया', 'वैशाली (कुण्डग्राम)', 'पावापुरी', 'लुम्बिनी'],
    answer: 'वैशाली (कुण्डग्राम)',
  },
  {
    question: 'जैन धर्म में "त्रिरत्न" में से क्या शामिल नहीं है?',
    options: ['सम्यक् दर्शन', 'सम्यक् ज्ञान', 'सम्यक् आचरण', 'सम्यक् तप'],
    answer: 'सम्यक् तप', // The main three are Darshan, Gyan, Charitra (Tapa is a part of Charitra or separately taught, but generally not included in the main 'Triratna' list of the path to liberation)
  },
  {
    question: '"सल्लेखना" या "संथारा" किस धर्म से संबंधित एक विधि है?',
    options: ['बौद्ध धर्म', 'वैष्णव धर्म', 'जैन धर्म', 'सिख धर्म'],
    answer: 'जैन धर्म',
  },
];

const ZoomSession = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const {navigation} = props;

  const currentQuestion = JAIN_QUESTIONS[currentQuestionIndex];

  // --- 2. GAME LOGIC ---

  const handleAnswer = (selectedOption) => {
    if (quizFinished) return;

    // Check if the selected answer is correct
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      Alert.alert('सही उत्तर!', 'आपका जवाब सही है।');
    } else {
      Alert.alert('गलत उत्तर!', `सही जवाब: ${currentQuestion.answer}`);
    }

    // Move to the next question or finish the quiz
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < JAIN_QUESTIONS.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
      Alert.alert('क्विज समाप्त!', `आप 'शिरामणी' बनने के कितने करीब हैं: ${score} / ${JAIN_QUESTIONS.length}`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  // --- 3. UI RENDERING ---

  const renderOptions = () => {
    // Label options A, B, C, D like in KBC
    const labels = ['A', 'B', 'C', 'D'];
    
    return currentQuestion.options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionButton}
        onPress={() => handleAnswer(option)}
        disabled={quizFinished}
      >
        <Text style={styles.optionLabel}>{labels[index]}.</Text>
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  if (quizFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.headerText}>परिणाम</Text>
          <Text style={styles.resultText}>
            आपने **{score}** में से **{JAIN_QUESTIONS.length}** सही जवाब दिए।
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
            <Text style={styles.buttonText}>फिर से खेलें</Text>
            <Ionicons name="reload" size={20} color="#fff" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>कौन बनेगा शिरोमणि</Text>
        <Text style={styles.scoreText}>सही जवाब: {score}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>प्रश्न {currentQuestionIndex + 1} / {JAIN_QUESTIONS.length}</Text>
        <Text style={styles.questionText}>
          {currentQuestion.question}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {renderOptions()}
      </View>

      <View style={styles.lifelinesContainer}>
        <TouchableOpacity style={styles.lifelineButton} onPress={() => Alert.alert('लाइफलाइन', '50:50 लाइफलाइन अभी काम नहीं कर रही है।')}>
          <Ionicons name="flash" size={24} color="#FFD700" />
          <Text style={styles.lifelineText}>50:50</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lifelineButton} onPress={() => Alert.alert('लाइफलाइन', 'दर्शक पोल लाइफलाइन अभी काम नहीं कर रही है।')}>
          <Ionicons name="people" size={24} color="#FFD700" />
          <Text style={styles.lifelineText}>दर्शक पोल</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lifelineButton} onPress={() => Alert.alert('लाइफलाइन', 'विशेषज्ञ की सलाह लाइफलाइन अभी काम नहीं कर रही है।')}>
          <Ionicons name="school" size={24} color="#FFD700" />
          <Text style={styles.lifelineText}>विशेषज्ञ सलाह</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lifelineButton} onPress={() => navigation.goBack()}>
          <Ionicons name="exit" size={24} color="#ab3535ff" />
          <Text style={styles.lifelineText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ZoomSession;

// --- 4. STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C', // Dark background for KBC feel
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    padding: 15,
    backgroundColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700', // Gold color
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scoreText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  questionContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#333333',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A4A4A',
  },
  questionNumber: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    flexShrink: 1, // Allows text to wrap
  },
  lifelinesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#4A4A4A',
    backgroundColor: '#222222',
  },
  lifelineButton: {
    alignItems: 'center',
  },
  lifelineText: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  // Result screen styles
  resultBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  resetButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
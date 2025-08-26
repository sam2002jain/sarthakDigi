import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Selection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // This prevents going back
    });

    return () => backHandler.remove();
  }, []);

  const handlePress = (option) => {
    setSelectedOption(option);
    if (option === 'Online Jain Manch ✨') {
      navigation.navigate('MainApp');
    }
    if (option === 'Insurance 🛡️') {
      alert('Insurance option selected. Functionality to be implemented.');
    }
    if (option === 'Jainam Print 🖨️') {
      alert('Jainam Print option selected. Functionality to be implemented.');
    }
  };

  const options = ['Online Jain Manch ✨', 'Insurance 🛡️', 'Jainam Print 🖨️'];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose a Service</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionCard,
              selectedOption === option && styles.selectedCard,
            ]}
            onPress={() => handlePress(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a4f78', // A light background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  optionCard: {
    backgroundColor: '#434777ff', // White background for the card
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#5a4f78', // Highlight with the brand color
    backgroundColor: '#e6e4ec', // A subtle shade for selected
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffff', // Dark text for readability
    textAlign: 'center',
    fontFamily:'Courier New'
  },
  selectedText: {
    color: '#202124',
  },
});
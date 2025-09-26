import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1625" />

      {/* Top Gradient */}
      <LinearGradient
        colors={['#00C853', '#FFFFFF', '#FFD600']} // Green → White → Yellow
        style={styles.topGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{marginLeft:20, flexDirection:'column', gap:10}}>
                <Image
                source={require("../../assets/image.png")}
                style={styles.logo}/>
                <Text style={{textAlign:'center'}}>since 2014</Text>
                </View>
            <View style={styles.logotextcontainer}>
                <Text style={styles.ojmtxt}>Online जैन मंच</Text>
                <Text style={styles.ojmsubtxt}>एक कदम सिद्धत्व की ओर</Text>
            </View>
            </View>
            
        </LinearGradient>

      
        <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        {/* Other Content */}
        <View style={styles.quickLinks}>
          <Text style={styles.quickLinksText}>Quick Links</Text>
          {/* Add more components here */}
        </View>

        <View style={styles.extraContent}>
          <Text style={styles.extraText}>More Scrollable Content Below</Text>
        </View>
      </ScrollView>
      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150, // Adjust this value for how tall the gradient should be
    zIndex: -1, // Keep it behind other elements
  },
  logo:{
    width:70,
    height:70,
    marginTop:40,
    
    borderRadius:10
  },
  logotextcontainer:{
    flexDirection:'column',
    alignItems:'flex-end',
    justifyContent:'center',
    marginTop:40,
    paddingRight:20
  },
  ojmtxt:{
    fontSize:34,
    fontWeight:600,
    color:"#193ca5ff"
  },
  ojmsubtxt:{
    fontSize:16,
    fontWeight:600,
    color:"#323131bb"
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 150, 
  },
  scrollContent: {
    padding: 20,
  },

  imageContainer: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  quickLinks: {
    paddingVertical: 10,
  },
  quickLinksText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  /* Extra Content */
  extraContent: {
    marginTop: 20,
    paddingVertical: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  extraText: {
    fontSize: 16,
    color: '#555',
  },
});

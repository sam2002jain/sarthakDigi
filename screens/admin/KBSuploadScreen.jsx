import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const KBSuploadScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headertext}>
            Upload KBS Question Data in Excel file
        </Text>
      </View>

      <View style={styles.maincontainer}>
        <TouchableOpacity style={styles.uploadbtn}>
          <Text style={styles.uploadbtntxt}>Upload file</Text>
        </TouchableOpacity>

        <View>
          {/* //here we can show success and error message// */}

          
        </View>
      </View>


    </SafeAreaView>
  )
}

export default KBSuploadScreen

const styles = StyleSheet.create({
  header:{
    flex:1,
    justifyContent:'center',
    alignContent:'center'
  },
  headertext:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'600,'
  },
  maincontainer:{
    justifyContent:'center',
    flex:1,
    flexDirection:'column'
  },
  uploadbtn:{

  },
  uploadbtntxt:{

  }
,})
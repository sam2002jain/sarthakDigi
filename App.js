import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import ForgetPassScreen from './screens/forgetpass';
import CustomDrawer from './components/CustomDrawer';
import Splash from './screens/SplashScreen';
import Prabhavna from './screens/main/PrabhavnaScreen'; 
import Swadhyay from './screens/main/SwadhyayScreen';
import Quiz from './screens/main/QuizScreen'; 
import Profile from './screens/main/Profile'; 
import Otherlink from './screens/main/Otherlink';
import BhajanScreen from './screens/main/BhajanScreen';
import Selection from './screens/main/SelectionScreen';
import InsuranceScreen from './screens/main/InsuranceScreen';
import { AuthProvider } from './components/context/AuthContext';
import Quizselection from './screens/main/Quizselection';
import ManchEkParichayScreen from './screens/main/ManchEkParichayScreen';
import WallOfFrameScreen from './screens/main/WallOfFrameScreen';
import AVMPalScreen from './screens/main/AVMPalScreen';
import PubBookScreen from './screens/main/PubBookScreen';
import WrittenCollectionScreen from './screens/main/WrittenCollectionScreen';
import PrashanManchScreen from './screens/main/PrashanManchScreen';
import SadbhavnaManchScreen from './screens/main/SadbhavnaManchScreen';




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* Requested sequence */}
      <Drawer.Screen name="ManchEkParichay" component={ManchEkParichayScreen} />
      <Drawer.Screen name="WallOfFrame" component={WallOfFrameScreen} />
      <Drawer.Screen name="AVMPal" component={AVMPalScreen} />
      <Drawer.Screen name="PubBook" component={PubBookScreen} />
      <Drawer.Screen name="WrittenCollection" component={WrittenCollectionScreen} />
      <Drawer.Screen name="PrashanManch" component={PrashanManchScreen} />
      <Drawer.Screen name="Prabhavna" component={Prabhavna} />
      <Drawer.Screen name="SadbhavnaManch" component={SadbhavnaManchScreen} />
      <Drawer.Screen name="Quiz" component={Quiz} />

      {/* Existing */}
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Otherlink" component={Otherlink} />
      <Drawer.Screen name="Swadhyay" component={Swadhyay} />
      <Drawer.Screen name="Bhajan" component={BhajanScreen} />
      <Drawer.Screen name="Selection" component={Selection} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              animation: 'slide_from_right'  // Add animation
            }} 
            initialRouteName='Splash'
          >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Auth" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgetPass" component={ForgetPassScreen} />
            <Stack.Screen 
              name="Selection" 
              component={Selection}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false
              }}
            />
            <Stack.Screen 
              name="Insurance" 
              component={InsuranceScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false
              }}
            />
            <Stack.Screen
              name="Quizselection"
              component={Quizselection}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false
              }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false
              }}
            />
            <Stack.Screen name="Bhajan" component={BhajanScreen}  options={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
                headerLeft: () => null,
                headerBackVisible: false
              }} />
            <Stack.Screen name="MainApp" component={DrawerNavigation} />
            
            
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
    </AuthProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
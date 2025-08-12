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
import Aichat from './screens/main/AichatScreen'; 
import Communityhub from './screens/main/Communityhub';
import ReflectionScreen from './screens/main/Reflectionjourney'; 
import Practice from './screens/main/PracticeReminder'; 
import Zoom from './screens/main/Zoomsession'; 
import Profile from './screens/main/Profile'; 
import Setting from './screens/main/Setting';




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
      <Drawer.Screen name="AI Chat" component={Aichat} />
      <Drawer.Screen name="Community" component={Communityhub} />
      <Drawer.Screen name="Reflection" component={ReflectionScreen} />
      <Drawer.Screen name="Practice" component={Practice} />
      <Drawer.Screen name="Zoom" component={Zoom} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Auth" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgetPass" component={ForgetPassScreen} />
            <Stack.Screen name="MainApp" component={DrawerNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
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
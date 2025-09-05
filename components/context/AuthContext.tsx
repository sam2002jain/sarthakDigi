import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDocument, updateDocument, getDocument } from '../../firebase';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: any) => Promise<{ success: boolean; error?: string }>;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        const userData = await getDocument('login', JSON.parse(storedUser).email);
        if (userData) {
          setUser(userData);
        }
        console.log(userData);
        await AsyncStorage.setItem('profiledata', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    }
  };

  const login = async (userData: any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      // Update the Firestore document using the user's UID as the document ID
      await updateDocument('login', userData.email, { 
        email: userData.email,
        lastLogin: new Date().toISOString()
      });
      const userprofileData= await getDocument('login', userData.email);
      console.log(userprofileData);
      await AsyncStorage.setItem('profiledata', JSON.stringify(userprofileData));
    } catch (error) {
      console.error('Error in login process:', error);
      throw error; // Propagate error to handle it in the login screen
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('profiledata');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  const signUp = async (userData: any) => {
    try {
      const existingUser = await getDocument('user', userData.username);
      if (existingUser) {
        return { success: false, error: 'Username already taken' };
      }

      await AsyncStorage.setItem('profiledata', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      await createDocument('user', userData.username, userData);
      await createDocument('login', userData.email, userData);
      return { success: true };
    } catch (error) {
      console.error('Error storing user data:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


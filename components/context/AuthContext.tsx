import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDocument, updateDocument, getDocument } from '../../firebase';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: any) => Promise<void>;

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
        const userData = await getDocument('user', JSON.parse(storedUser).email);
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
      await updateDocument('user', userData.email, { 
        email: userData.email,
        lastLogin: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in login process:', error);
      throw error; // Propagate error to handle it in the login screen
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  const signUp = async (userData: any) => {
    try {
      await AsyncStorage.setItem('signup', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      await createDocument('user', userData.email, userData);
    } catch (error) {
      console.error('Error storing user data:', error);
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

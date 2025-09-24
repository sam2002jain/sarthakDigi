import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDocument, updateDocument, getDocument, deleteDocument } from '../../firebase';

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: any | null;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: any) => Promise<{ success: boolean; error?: string }>;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
        // Set admin immediately from stored user to avoid race on splash
        const storedEmail = (parsed?.email || '').toLowerCase();
        setIsAdmin(storedEmail === 'admin@gmail.com');
        const userData = await getDocument('login', parsed.email);
        const adminEmail = (userData?.email || parsed?.email || '').toLowerCase();
        setIsAdmin(adminEmail === 'admin@gmail.com');
        if (userData) setUser(userData);
       
        console.log(userData);
        await AsyncStorage.setItem('profiledata', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    }
  };

  const login = async (userData: any) => {
    try {
      const adminEmail = (userData?.email || '').toLowerCase();
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAdmin(adminEmail === 'admin@gmail.com');
      setIsAuthenticated(true);
      
      // Update the Firestore document using the user's email as the document ID
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
      if (!userData.username) {
        return { success: false, error: 'Username is required' };
      }

      // Check for existing user
      let existingUser;
      try {
        existingUser = await getDocument('user', userData.username);
      } catch (error) {
        console.error('Error checking existing user:', error);
        return { success: false, error: 'Network error, please try again' };
      }

      if (existingUser) {
        return { success: false, error: 'Username already taken' };
      }

      // Create user documents
      try {
        await createDocument('user', userData.username, userData);
        await createDocument('login', userData.email, userData);
        await AsyncStorage.setItem('profiledata', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      } catch (error) {
        console.error('Error creating user documents:', error);
        return { success: false, error: 'Failed to create account, please try again' };
      }
    } catch (error) {
      console.error('Error in signup process:', error);
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  
  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout, signUp }}>
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


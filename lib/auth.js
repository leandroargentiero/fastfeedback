import Router from 'next/router';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { initFirebase } from './firebase';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

// Initialize Firebase App
initFirebase();

// Create firebase auth object
const auth = getAuth();

// Create social providers
const githubProvider = new GithubAuthProvider();
// const googleProvider = new GoogleAuthProvider();

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const signinWithGitHub = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, githubProvider);
      handleUser(result.user);
    } catch (err) {
      console.log('Login Failed:', err);
    }
  };

  const signout = async (redirect) => {
    try {
      await signOut(auth);
      handleUser(false);

      if (redirect) {
        Router.push(redirect);
      }
    } catch (err) {
      console.log('Signout Failed:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signout
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};

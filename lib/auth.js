import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import { initFirebase } from './firebase';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import Cookies from 'js-cookie';

import { createUser } from './db';

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

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const firebaseUserIdToken = await rawUser.getIdToken(true);
      const user = formatUser(rawUser, firebaseUserIdToken);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setLoading(false);
      setUser(user);
      Cookies.set('fast-feedback-auth', true, { expires: 1 });

      return user;
    } else {
      setLoading(false);
      setUser(false);
      Cookies.remove('fast-feedback-auth');

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
    const unsubscribe = auth.onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signout
  };
}

const formatUser = (user, jwt) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: jwt,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};

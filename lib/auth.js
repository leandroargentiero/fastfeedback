import Router from 'next/router';
import { useState, useEffect, useContext, createContext } from 'react';
import { auth, providers } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from '@firebase/auth';
import { createUser } from './db';

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
      createUser(user.uid, user);
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
      const result = await signInWithPopup(auth, providers.gitHubProvider);
      handleUser(result.user);
    } catch (err) {
      console.log('Login Failed:', err);
    }
  };

  const signinWithGoogle = async (redirect) => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, providers.GoogleAuthProvider);
      handleUser(result.user);

      if (redirect) {
        Router.push(redirect);
      }
    } catch (err) {
      console.log('Login Failed:', err);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      handleUser(false);
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
    signinWithGoogle,
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

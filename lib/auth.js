import Router from 'next/router';
import { useState, useEffect, useContext, createContext } from 'react';
import { auth, gitHubProvider, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from '@firebase/auth';

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

  const signinWithGitHub = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        handleUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        handleUser(result.user);

        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signout = () => {
    return signOut(auth)
      .then(() => {
        handleUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
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

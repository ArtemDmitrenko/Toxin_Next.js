import Router from 'next/router';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import setAuthUserData from 'Root/redux/auth/authActions';
import { useAppDispatch } from 'Root/redux/hooks';
import Layout from 'Components/Layout/Layout';
import Login, { AuthData } from 'Components/Login/Login';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import AuthErrorMessage from 'Components/AuthErrorMessage/AuthErrorMessage';

const auth = getAuth(initializeApp({
  apiKey: 'AIzaSyDjlISC_n81sYbH9ziz66rrYcOnEkNIWQo',
  authDomain: 'toxin-coolhackers.firebaseapp.com',
  projectId: 'toxin-coolhackers',
  storageBucket: 'toxin-coolhackers.appspot.com',
  messagingSenderId: '297163595644',
  appId: '1:297163595644:web:8cc3be821b5e331c2a0ef9',
  measurementId: 'G-71SVNT6E1K',
}));

const SignIn = () => {
  const [isLoginError, setLoginError] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async ({ email, password }: AuthData) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setAuthUserData({
          userId: user.uid,
          email: user.email,
        }));
        setLoginError(false);
        Router.push('/');
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  return (
    <Layout title="Sign in">
      <BackgroundAuth>
        <div>
          { isLoginError && <AuthErrorMessage href="/auth/forgot-password" /> }
          <Login onSubmit={onSubmit} />
        </div>
      </BackgroundAuth>
    </Layout>
  );
};

export default SignIn;

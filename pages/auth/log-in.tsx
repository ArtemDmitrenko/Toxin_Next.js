import Router from 'next/router';
import { useState } from 'react';

import Firebase from 'Root/api/Firebase';
import setAuthUserData from 'Root/redux/auth/authActions';
import { useAppDispatch } from 'Root/redux/hooks';
import Layout from 'Components/Layout/Layout';
import Login, { AuthData } from 'Components/Login/Login';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import AuthErrorMessage from 'Components/AuthErrorMessage/AuthErrorMessage';

const SignIn = () => {
  const [isLoginError, setLoginError] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async ({ email, password }: AuthData) => {
    await Firebase.singInWithEmail(email, password)
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

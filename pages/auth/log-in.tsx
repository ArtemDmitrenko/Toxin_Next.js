import Router from 'next/router';
import { useEffect, useState } from 'react';

import { userLoginRequest } from 'Root/redux/auth/authActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import Layout from 'Components/Layout/Layout';
import LoginCard, { AuthData } from 'Root/components/LoginCard/LoginCard';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import AuthErrorMessage from 'Components/AuthErrorMessage/AuthErrorMessage';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [hasAuthError, setAuthError] = useState(false);

  const handleLoginCardSubmit = ({ email, password }: AuthData) => {
    dispatch(userLoginRequest({ email, password }));
  };

  const userAuthData = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userAuthData.error) setAuthError(true);
    if (userAuthData.isAuth) {
      setAuthError(false);
      Router.push('/');
    }
  }, [userAuthData]);

  return (
    <Layout title="Sign in">
      <BackgroundAuth>
        <div>
          { hasAuthError && <AuthErrorMessage href="/auth/forgot-password" /> }
          <LoginCard onSubmit={handleLoginCardSubmit} />
        </div>
      </BackgroundAuth>
    </Layout>
  );
};

export default SignIn;

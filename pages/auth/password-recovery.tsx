import Router from 'next/router';
import { useEffect, useState } from 'react';

import Firebase from 'Root/api/Firebase';

import { passwordRecoveryRequest } from 'Root/redux/auth/authActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';
import PasswordRecoveryMessage from 'Components/PasswordRecoveryMessage/PasswordRecoveryMessage';

const PasswordRecovery = () => {
  const dispatch = useAppDispatch();
  const [hasEmailError, setEmailError] = useState(false);
  const [hasEmailSuccess, setEmailSuccess] = useState(false);

  const handlePasswordRecoveryCard = (email: string) => {
    dispatch(passwordRecoveryRequest({ email }));
  }

  const userAuthData = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userAuthData.email && userAuthData.error) {
      setEmailSuccess(false);
      setEmailError(true);
    };
    if (userAuthData.email && !userAuthData.error) {
      setEmailError(false);
      setEmailSuccess(true);
      setTimeout(()=> {
        Router.push('/auth/log-in');
      }, 3000);
    }
  }, [userAuthData]);

  return (
    <Layout title="Password recovery">
      <BackgroundAuth>
        <div>
          { hasEmailError && <PasswordRecoveryMessage message={'По указанному email не найдено зарегистрированных пользователей. Пожалуйста, введите корректный email.'} />}
          { hasEmailSuccess && <PasswordRecoveryMessage message={'Инструкция по восстановлению пароля направлена на указанный email.'} />}
          <PasswordRecoveryCard onSubmit={handlePasswordRecoveryCard} />
        </div>
      </BackgroundAuth>
    </Layout>
  );
};

export default PasswordRecovery;

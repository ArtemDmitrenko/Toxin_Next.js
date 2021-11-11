import Router from 'next/router';
import { useEffect } from 'react';

import { passwordRecoveryRequest } from 'Root/redux/auth/authActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';
import PasswordRecoveryMessage from 'Components/PasswordRecoveryMessage/PasswordRecoveryMessage';

const PasswordRecovery = () => {
  const dispatch = useAppDispatch();

  const handlePasswordRecoveryCard = (email: string) => {
    dispatch(passwordRecoveryRequest({ email }));
  };

  const { email, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (email && !error) {
      setTimeout(() => {
        Router.push('/auth/log-in');
      }, 3000);
    }
  }, [email, error]);

  return (
    <Layout title="Password recovery">
      <BackgroundAuth>
        <div>
          { email && error && <PasswordRecoveryMessage message="По указанному email не найдено зарегистрированных пользователей. Пожалуйста, введите корректный email." isError />}
          { email && !error && <PasswordRecoveryMessage message="Инструкция по восстановлению пароля направлена на указанный email." />}
          <PasswordRecoveryCard onSubmit={handlePasswordRecoveryCard} />
        </div>
      </BackgroundAuth>
    </Layout>
  );
};

export default PasswordRecovery;

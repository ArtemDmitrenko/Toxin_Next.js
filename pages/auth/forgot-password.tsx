import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';

const ForgotPassword = () => {
  initializeApp({
    apiKey: 'AIzaSyDjlISC_n81sYbH9ziz66rrYcOnEkNIWQo',
    authDomain: 'toxin-coolhackers.firebaseapp.com',
    projectId: 'toxin-coolhackers',
    storageBucket: 'toxin-coolhackers.appspot.com',
    messagingSenderId: '297163595644',
    appId: '1:297163595644:web:8cc3be821b5e331c2a0ef9',
    measurementId: 'G-71SVNT6E1K',
  });

  const auth = getAuth();

  const onSubmit = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Инструкция по восстановлению пароля направлена на указанный email');
      })
      .catch(() => {
        alert('По указанному email не найдено зарегистрированных пользователей. Пожалуйста, введите корректный email.');
      });
  };

  return (
    <Layout title="Forgot password">
      <BackgroundAuth>
        <PasswordRecoveryCard onSubmit={onSubmit} />
      </BackgroundAuth>
    </Layout>
  );
};

export default ForgotPassword;

import { sendPasswordResetEmail } from 'firebase/auth';
import Firebase from 'api/Firebase';

import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';

const PasswordRecovery = () => {
  const auth = Firebase.auth();
  auth.languageCode = 'ru';

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
    <Layout title="Password recovery">
      <BackgroundAuth>
        <PasswordRecoveryCard onSubmit={onSubmit} />
      </BackgroundAuth>
    </Layout>
  );
};

export default PasswordRecovery;

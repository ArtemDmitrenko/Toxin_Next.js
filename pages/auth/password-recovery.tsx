import Router from 'next/router';

import Firebase from 'Root/api/Firebase';

import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';

const PasswordRecovery = () => {
  const handleSubmit = async (email: string) => {
    await Firebase.sendPasswordRecovery(email)
      .then(() => {
        alert('Инструкция по восстановлению пароля направлена на указанный email');
        Router.push('/');
      })
      .catch(() => {
        alert('По указанному email не найдено зарегистрированных пользователей. Пожалуйста, введите корректный email.');
      });
  };

  return (
    <Layout title="Password recovery">
      <BackgroundAuth>
        <PasswordRecoveryCard onSubmit={handleSubmit} />
      </BackgroundAuth>
    </Layout>
  );
};

export default PasswordRecovery;

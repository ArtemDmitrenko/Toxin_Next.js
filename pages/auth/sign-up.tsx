import Router from 'next/router';

import Firebase from 'Root/api/Firebase';

import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import SignUpCard, { SignUpCardData } from 'Components/SignUpCard/SignUpCard';

const SignUp = () => {
  const register = async (data: SignUpCardData) => {
    await Firebase.createUser(data);
    Router.push('/');
  };

  return (
    <Layout title="Sign up">
      <BackgroundAuth>
        <SignUpCard onSubmit={register} />
      </BackgroundAuth>
    </Layout>
  );
};

export default SignUp;

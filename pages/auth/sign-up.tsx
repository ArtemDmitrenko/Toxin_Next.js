import Router from 'next/router';


import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import SignUpCard, { SignUpCardData } from 'Components/SignUpCard/SignUpCard';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import { useState } from 'react';
import { signUpUserRequest } from 'Root/redux/signUp/signUpActions';

const SignUp = () => {
  const dispatch = useAppDispatch();
  // const [hasSignUpError, setSignUpError] = useState(false);
  // const userSignUpData = useAppSelector((state) => state.signUp);

  const handleRegistrationSubmit = (userData: SignUpCardData) => {
    dispatch(signUpUserRequest(userData));
  };
  // const handleRegistrationSubmit = async (data: SignUpCardData) => {
  //   await Firebase.createUser(data);
  //   Firebase.updateUserName(`${data.name} ${data.surname}`);
  //   Router.push('/');
  // };

  return (
    <Layout title="Sign up">
      <BackgroundAuth>
        <SignUpCard onSubmit={handleRegistrationSubmit} />
      </BackgroundAuth>
    </Layout>
  );
};

export default SignUp;

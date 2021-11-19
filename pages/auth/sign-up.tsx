import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import SignUpCard, { SignUpCardData } from 'Components/SignUpCard/SignUpCard';
import { useAppDispatch } from 'Root/redux/hooks';
import { signUpUserRequest } from 'Root/redux/signUp/signUpActions';

const SignUp = () => {
  const dispatch = useAppDispatch();

  const handleRegistrationSubmit = (userData: SignUpCardData) => {
    dispatch(signUpUserRequest(userData));
  };

  return (
    <Layout title="Sign up">
      <BackgroundAuth>
        <SignUpCard onSubmit={handleRegistrationSubmit} />
      </BackgroundAuth>
    </Layout>
  );
};

export default SignUp;

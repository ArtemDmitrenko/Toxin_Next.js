import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import SignUpCard from 'Components/SignUpCard/SignUpCard';

const SignUp = () => (
  <Layout title="Sign up">
    <BackgroundAuth>
      <SignUpCard onSubmit={(data) => data} />
    </BackgroundAuth>
  </Layout>
);

export default SignUp;

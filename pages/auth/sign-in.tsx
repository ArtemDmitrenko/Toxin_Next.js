import Layout from 'Components/Layout/Layout';
import LoginCard from 'Components/LoginCard/LoginCard';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';

const SignIn = () => (
  <Layout title="Sign in">
    <BackgroundAuth>
      <LoginCard onSubmit={() => {}} />
    </BackgroundAuth>
  </Layout>
);

export default SignIn;

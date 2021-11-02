import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';

const ForgotPassword = () => (
  <Layout title="Forgot password">
    <BackgroundAuth>
      <PasswordRecoveryCard onSubmit={() => {}} />
    </BackgroundAuth>
  </Layout>
);

export default ForgotPassword;

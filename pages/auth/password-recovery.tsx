import Firebase from 'api/Firebase';

import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import PasswordRecoveryCard from 'Components/PasswordRecoveryCard/PasswordRecoveryCard';

const PasswordRecovery = () => (
  <Layout title="Password recovery">
    <BackgroundAuth>
      <PasswordRecoveryCard onSubmit={Firebase.sendPasswordRecovery} />
    </BackgroundAuth>
  </Layout>
);

export default PasswordRecovery;

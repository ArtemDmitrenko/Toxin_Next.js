import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import SignUpCard from 'Components/SignUpCard/SignUpCard';

import styles from './sign-up.module.scss';

const SignUp = () => (
  <Layout title="Sign up">
    <BackgroundAuth>
      <SignUpCard onSubmit={(data) => {console.log(data)}} />
    </BackgroundAuth>
  </Layout>
);

export default SignUp;

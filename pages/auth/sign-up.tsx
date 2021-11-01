import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import SignUpCard from 'Components/SignUpCard/signUpCard';
import RadioButton from 'Components/RadioButton/RadioButton';

import styles from './sign-up.module.scss';

const SignUp = () => (
  <Layout title="Sign up">
    <BackgroundAuth>
      <SignUpCard onSubmit={(data) => {console.log(data)}} />
    </BackgroundAuth>
  </Layout>
);

export default SignUp;


{/* <div className={styles.radioButton}>
  <RadioButton
    name="sex"
    value="female"
    content="Женщина"
  />
</div> */}
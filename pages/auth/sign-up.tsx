import Layout from 'Components/Layout/Layout';
import BackgroundAuth from 'Components/BackgroundAuth/BackgroundAuth';
import RadioButton from 'Components/RadioButton/RadioButton';

import styles from './sign-up.module.scss';

const SignUp = () => (
  <Layout title="Sign up">
    <BackgroundAuth>
      <div className={styles.radioGroup}>
        <div className={styles.radioButton}>
          <RadioButton
            name="sex"
            value="male"
            content="Мужчина"
            isDefaultChecked
          />
        </div>
        <div className={styles.radioButton}>
          <RadioButton
            name="sex"
            value="female"
            content="Женщина"
          />
        </div>
      </div>
    </BackgroundAuth>
  </Layout>
);

export default SignUp;

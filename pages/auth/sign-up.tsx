import Layout from 'Components/Layout/Layout';
import RadioButton from 'Components/RadioButton/RadioButton';

import styles from './sign-up.module.scss';

const SignUp = () => (
  <Layout title="Sign up">
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
  </Layout>
);

export default SignUp;

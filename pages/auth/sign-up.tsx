import Layout from 'Components/Layout/Layout';
import RadioGroup from 'Components/RadioGroup/RadioGroup';

import styles from './sign-up.module.scss';

const radioList = [
  {
    value: 'male',
    content: 'Мужчина',
  },
  {
    value: 'female',
    content: 'Женщина',
  },
];

const SignUp = () => (
  <Layout title="Sign up">
    <RadioGroup
      list={radioList}
      name="sex"
      className={styles.radioGroup}
      radioClassName={styles.radioButton}
    />
  </Layout>
);

export default SignUp;

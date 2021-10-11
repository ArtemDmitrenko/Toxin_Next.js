import { Form, Field } from 'react-final-form';

import hasValidateEmail from 'Root/utils/hasValidateEmail';

import styles from './subscribe.module.scss';

type FormProps = {
  onSubmit: (email: string) => void,
};

type FormValues = {
  email: string,
};

type FormApi = {
  reset: () => void,
};

const Subscribe = ({ onSubmit }: FormProps) => {
  const handleFormSubmit = (values: FormValues, form: FormApi) => {
    const { email } = values;

    if (hasValidateEmail(email)) {
      onSubmit(email);
      form.reset();
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <Field
              className={styles.field}
              name="email"
              component="input"
              placeholder="Email"
            />
            <button
              className={styles.buttonArrow}
              type="submit"
              name="subscribe"
              aria-label="button for submitting a subscription form"
            />
          </div>
        </form>
      )}
    </Form>

  );
};

export default Subscribe;

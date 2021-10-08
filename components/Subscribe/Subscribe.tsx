import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';

import hasValidateEmail from 'Root/utils/hasValidateEmail';

import styles from './subscribe.module.scss';

type FormProps = {
  method: string,
  url: string,
  headers: Record<string, string>
};

type FormValues = {
  email: string,
};

type FormApi = {
  reset: () => void,
};

const Subscribe = ({ method, url, headers }: FormProps) => {
  const [userEmail, setEmail] = useState({ userEmail: '' });

  const onSubmit = (values: FormValues, form: FormApi) => {
    const { email } = values;

    if (hasValidateEmail(email)) {
      setEmail({ userEmail: email });
      form.reset();
    }
  };

  useEffect(() => {
    fetch(url, {
      method,
      headers,
      body: JSON.stringify(userEmail),
    });
  });

  return (
    <Form onSubmit={onSubmit}>
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

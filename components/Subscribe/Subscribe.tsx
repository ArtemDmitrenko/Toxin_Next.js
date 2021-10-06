import { Form, Field } from 'react-final-form';

import subscribe from 'Root/redux/subscribe/subscribeActions';
import { useAppDispatch } from 'Root/redux/hooks';

import styles from './subscribe.module.scss';
import hasValidateEmail from './utils';

type FormValues = {
  email: string,
};

type FormApi = {
  reset: () => void,
};

const Subscribe = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormValues, form: FormApi) => {
    const { email } = values;

    if (hasValidateEmail(email)) {
      dispatch(subscribe(email));
      form.reset();
    }
  };

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

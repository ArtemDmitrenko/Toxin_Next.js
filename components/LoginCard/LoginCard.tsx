/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form } from 'react-final-form';

import Reference from 'Components/Reference/Reference';

import requiredEmail from './helpers/requiredEmail';
import requiredPassword from './helpers/requiredPassword';

import styles from './loginCard.module.scss';

type FormProps = {
  onSubmit: ({ email, password }: { email: string, password: string }) => void,
};

type AuthData = {
  email: string,
  password: string,
};

const LoginCard = ({ onSubmit }: FormProps) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Войти</h1>
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            validate={requiredEmail}
          >
            {({ input, meta, placeholder }) => (
              <div className={styles.email}>
                {meta.error && meta.touched && <span>{meta.error}</span>}
                <input
                  {...input}
                  className={styles.field}
                  placeholder={placeholder}
                />
              </div>
            )}
          </Field>
          <Field
            name="password"
            type="password"
            placeholder="Пароль"
            validate={requiredPassword}
          >
            {({ input, meta, placeholder }) => (
              <div className={styles.password}>
                {meta.error && meta.touched && <span>{meta.error}</span>}
                <input
                  {...input}
                  className={styles.field}
                  placeholder={placeholder}
                />
              </div>
            )}
          </Field>
          <Reference
            isButton
            buttonType="submit"
            disabled={submitting}
            text="Войти"
            type="directed"
            size="big"
          />
        </form>
      )}
    </Form>
    <div className={styles.question}>
      <span>Нет аккаунта на Toxin?</span>
      <Reference href="/auth/sign-up" text="создать" type="bordered" size="big" />
    </div>
  </div>
);

export type { AuthData };
export default LoginCard;

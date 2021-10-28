/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form } from 'react-final-form';

import hasValidateEmail from 'Root/utils/hasValidateEmail';
import Reference from 'Components/Reference/Reference';

import styles from './loginCard.module.scss';

type FormProps = {
  onSubmit: ({ loginEmail, password }: { loginEmail: string, password: string }) => void,
};

type LoginFormData = {
  loginEmail: string,
  password: string,
};

const LoginCard = ({ onSubmit }: FormProps) => {
  const requiredEmail = (email: string) => {
    if (!email) return 'Введите email';
    if (!hasValidateEmail(email)) return 'Введите корректный email';
    return '';
  };

  const requiredPassword = (password: string) => (password ? undefined : 'Введите пароль');

  const buttonClass = `${styles.button} ${styles.directed} ${styles.big}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Войти</h1>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="loginEmail"
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
            <button
              className={buttonClass}
              type="submit"
              disabled={submitting}
            >
              войти
            </button>
          </form>
        )}
      </Form>
      <div className={styles.question}>
        <span>Нет аккаунта на Toxin?</span>
        <Reference href="/auth/sign-up" text="создать" type="bordered" size="big" />
      </div>
    </div>
  );
};

export type { LoginFormData };
export default LoginCard;

/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form } from 'react-final-form';

import Reference from 'Components/Reference/Reference';

import styles from './loginCard.module.scss';

type FormValues = {
  email: string,
  password: string,
};

const LoginCard = () => {
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleFormSubmit = async (values: FormValues) => {
    await sleep(300);
    console.log(JSON.stringify(values, undefined, 2));
  };

  const requiredEmail = (value: string) => (value ? undefined : 'Введите email');
  const requiredPassword = (value: string) => (value ? undefined : 'Введите пароль');

  return (
    <div className={styles.mockWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Войти</h1>
        <Form onSubmit={handleFormSubmit}>
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="email"
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
                className={styles.button}
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
          <Reference href="/404" text="создать" type="bordered" size="big" />
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

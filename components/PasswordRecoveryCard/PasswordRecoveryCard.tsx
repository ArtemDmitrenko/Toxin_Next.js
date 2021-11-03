/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form } from 'react-final-form';

import requiredEmail from 'Root/utils/requiredEmail';
import Reference from 'Components/Reference/Reference';

import styles from './passwordRecoveryCard.module.scss';

type FormProps = {
  onSubmit: (email: string) => void,
};

const PasswordRecoveryCard = ({ onSubmit }: FormProps) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Восстановление пароля</h1>
    <Form onSubmit={(e) => { onSubmit(e.Email); }}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="Email"
            type="email"
            placeholder="Email"
            validate={requiredEmail}
          >
            {({ input, placeholder, meta }) => (
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
          <div className={styles.buttonRecovery}>
            <Reference
              isButton
              buttonType="submit"
              disabled={submitting}
              text="Восстановить пароль"
              type="directed"
              size="big"
            />
          </div>
          <div className={styles.buttonBack}>
            <Reference
              href="/auth/sign-in"
              text="Назад"
              type="bordered"
              size="big"
            />
          </div>
        </form>
      )}
    </Form>
  </div>
);

export default PasswordRecoveryCard;

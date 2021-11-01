/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form } from 'react-final-form';

import Toggle, { ToggleData } from 'Components/Toggle/Toggle';
import Checkbox from '../Checkbox/Checkbox';

import styles from './signUpCard.module.scss';

type SignUpCardData = {
  // name: string,
  // surname: string,
  // dateOfBirth: string,
  // email: string,
  // password: string,
  // getSpecialOffers: boolean
};

type SignUpCardProps = {
  onSubmit: (data: SignUpCardData) => void
};

// const ToggleAdapter = ({ title, name, onChange, ...rest }: { title: string, name: string, onChange: (data) => void }) => (
//   <Toggle
//     title={title}
//     name={name}
//     onChange={(data: ToggleData) => onChange(data)}
//     {...rest}
//   />
// );


// const ToggleAdapter = ({ input: { onChange, value }, label, ...rest }) => (
//   <Toggle
//     name={label}
//     {...rest}
//   />
// )



const SignUpCard = ({ onSubmit }: SignUpCardProps) => {
  const validate = (text: string) => (value: string) => (value ? undefined : text);

  const buttonClass = `${styles.button} ${styles.directed} ${styles.big}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация аккаунта</h1>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              type="text"
              placeholder="Имя"
              validate={validate('Введите имя')}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.name}>
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
              name="surname"
              type="text"
              placeholder="Фамилия"
              validate={validate('Введите фамилию')}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.surname}>
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
              name="specialOffers"
              type="checkbox"
            >
              {() => (
                <div className={styles.surname}>
                  <Toggle title="Получать спецпредложения" name="specialOffers" />
                </div>
              )}
            </Field>
            <Field
              name="specialOffers"
              type="checkbox"
            >
              { (fieldState) => (
                <pre>
                  {JSON.stringify(fieldState, undefined, 2)}
                </pre>
              )}
            </Field>
            <button
              className={buttonClass}
              type="submit"
              disabled={submitting}
            >
              зарегистрироваться
            </button>
          </form>
        )}
      </Form>
      <Toggle title="Получать спецпредложения" name="specialOffers" isChecked />
      <Checkbox title="Выбери меня" name="specialOffers" isChecked />
    </div>
  );
};

export type { SignUpCardData };
export default SignUpCard;

/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form, FieldRenderProps } from 'react-final-form';
import { IMaskInput } from 'react-imask';

import hasValidateEmail from 'Root/utils/hasValidateEmail';
import RadioButton from 'Components/RadioButton/RadioButton';
import Toggle from 'Components/Toggle/Toggle';
import Reference from 'Components/Reference/Reference';

import styles from './signUpCard.module.scss';

type Sex = 'male' | 'female';

type SignUpCardData = {
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  password: string,
  specialOffers: { isChecked: boolean }
};

type SignUpCardProps = {
  onSubmit: (data: SignUpCardData) => void
};

const SignUpCard = ({ onSubmit }: SignUpCardProps) => {
  const ToggleAdapter = ({ input: { onChange }, ...rest }: FieldRenderProps<boolean, any>) => (
    <Toggle
      title={rest.title}
      name={rest.name}
      onChange={(data) => onChange(data)}
      {...rest}
    />
  );

  const validate = (text: string) => (value: string) => (value ? undefined : text);

  const birthdayValidate = (signNoText: string, signNotValid: string) => (value: string) => {
    validate(signNoText);
    const dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (value) {
      if (!value.match(dateReg)) return signNotValid;
      return undefined;
    }
    return signNoText;
  };

  const emailValidate = (signNoText: string, signNotValid: string) => (value: string) => {
    if (!value) return signNoText;
    if (!hasValidateEmail(value)) return signNotValid;
    return '';
  };

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
              validate={validate('Обязательное поле')}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.name}>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
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
              validate={validate('Обязательное поле')}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.surname}>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
                  <input
                    {...input}
                    className={styles.field}
                    placeholder={placeholder}
                  />
                </div>
              )}
            </Field>
            <div className={styles.sex}>
              <Field<Sex>
                component={RadioButton}
                name="sex"
                content="Мужчина"
                value="male"
                type="radio"
                checked
              />

              <Field<Sex>
                component={RadioButton}
                name="sex"
                content="Женщина"
                value="female"
                type="radio"
              />
            </div>

            <Field
              name="dateOfBirth"
              type="text"
              validate={birthdayValidate('Обязательное поле', 'Заполнено некорректно')}
            >
              {({ input, meta }) => (
                <div className={styles.dateOfBirth}>
                  <div className={styles.subtitle}>Дата рождения</div>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
                  <IMaskInput
                    {...input}
                    className={styles.field}
                    mask={Date}
                    placeholder="ДД.ММ.ГГГГ"
                    min={new Date(1990, 0, 1)}
                    max={new Date()}
                  />
                </div>
              )}
            </Field>


            <Field
              name="email"
              type="email"
              placeholder="Email"
              validate={emailValidate('Обязательное поле', 'Заполнено некорректно')}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.name}>
                  <div className={styles.subtitle}>Данные для входа в сервис</div>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
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
              type="text"
              placeholder="Пароль"
              validate={validate('Обязательное поле')}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.surname}>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
                  <input
                    {...input}
                    className={styles.field}
                    placeholder={placeholder}
                  />
                </div>
              )}
            </Field>

            <div className={styles.offers}>
              <Field
                name="specialOffers"
                title="Получить спецпредложения"
                component={ToggleAdapter}
              />
            </div>


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
      <div className={styles.question}>
        <span>Уже есть аккаунт на Toxin</span>
        <Reference href="/auth/sign-in" text="войти" type="bordered" size="big" />
      </div>


    </div>
  );
};

export type { SignUpCardData };
export default SignUpCard;

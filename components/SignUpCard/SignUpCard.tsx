/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form, FieldRenderProps } from 'react-final-form';
import { IMaskInput } from 'react-imask';
import Link from 'next/link';

import { useAppSelector } from 'Root/redux/hooks';
import RadioButton from 'Components/RadioButton/RadioButton';
import Toggle from 'Components/Toggle/Toggle';
import Reference from 'Components/Reference/Reference';
import Message from 'Components/Message/Message';

import validate from './helpers/validate';
import nameValidate from './helpers/nameValidate';
import birthdayValidate from './helpers/birthdayValidate';
import emailValidate from './helpers/emailValidate';

import styles from './signUpCard.module.scss';

type SignUpCardData = {
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  password: string,
  sex: string,
  specialOffers?: boolean
};

type SignUpCardProps = {
  onSubmit: (data: SignUpCardData) => void
};

const SignUpCard = ({ onSubmit }: SignUpCardProps) => {
  const { error, isSignUp } = useAppSelector((store) => store.signUp);

  const ToggleAdapter = ({ input, title }: FieldRenderProps<boolean, any>) => (
    <Toggle
      title={title}
      name={input.name}
      isChecked={input.checked}
      onChange={input.onChange}
    />
  );

  const RadioButtonAdapter = ({ input, content }: FieldRenderProps<string, any>) => (
    <RadioButton
      content={content}
      name={input.name}
      value={input.value}
      isDefaultChecked={input.checked}
      onChange={input.onChange}
    />
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация аккаунта</h1>
      <Form onSubmit={onSubmit} initialValues={{ sex: 'male' }}>
        {({
          handleSubmit, submitting, pristine,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              type="text"
              placeholder="Имя"
              validate={nameValidate('Укажите имя', 'Имя не должно содержать символы')}
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
              validate={nameValidate('Укажите фамилию', 'Фамилия не должна содержать символы')}
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
              <Field
                component={RadioButtonAdapter}
                name="sex"
                content="Мужчина"
                value="male"
                type="radio"
                checked
              />
              <Field
                component={RadioButtonAdapter}
                name="sex"
                content="Женщина"
                value="female"
                type="radio"
              />
            </div>
            <Field
              name="dateOfBirth"
              type="text"
              validate={birthdayValidate('Укажите дату рождения', 'Некорректная дата')}
            >
              {({ input, meta }) => (
                <div className={styles.dateOfBirth}>
                  <div className={styles.subtitle}>Дата рождения</div>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
                  <IMaskInput
                    {...input}
                    mask={Date}
                    placeholder="ДД.ММ.ГГГГ"
                    min={new Date(1900, 0, 1)}
                    max={new Date()}
                    className={styles.field}
                  />
                </div>
              )}
            </Field>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              validate={emailValidate('Укажите Email', 'Некорректный Email')}
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
              type="password"
              placeholder="Пароль"
              validate={validate('Укажите пароль')}
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
                type="checkbox"
                component={ToggleAdapter}
              />
            </div>
            <Reference
              isButton
              buttonType="submit"
              disabled={submitting || pristine}
              text="зарегистрироваться"
              type="directed"
              size="big"
            />
            {error && (
              <div className={styles.warningMessage}>
                {error === 'auth/email-already-in-use'
                  ? (
                    <Message type="error">
                      Пользователь с такой электронной&nbsp;почтой уже существует.
                      <br />
                      <b>
                        <Link href="/auth/log-in">
                          <a className={styles.link} href="replace">
                          &nbsp;Попробуйте войти в аккаунт
                          </a>
                        </Link>
                      </b>
                    </Message>
                  )
                  : (
                    <Message type="error">
                      {error}
                    </Message>
                  )}
              </div>
            )}
            {isSignUp && (
              <div className={styles.warningMessage}>
                <Message type="success">
                  Вы успешно зарегистрированы и можете
                  <b>
                    <Link href="/auth/log-in">
                      <a className={styles.link} href="replace">
                      &nbsp;войти в аккаунт
                      </a>
                    </Link>
                  </b>
                </Message>
              </div>
            )}
          </form>
        )}
      </Form>
      <div className={styles.question}>
        <span>Уже есть аккаунт на Toxin</span>
        <Reference
          href="/auth/sign-in"
          text="войти"
          type="bordered"
          size="big"
        />
      </div>
    </div>
  );
};

export type { SignUpCardData };
export default SignUpCard;

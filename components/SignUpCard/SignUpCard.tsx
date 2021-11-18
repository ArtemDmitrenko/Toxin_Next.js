/* eslint-disable react/jsx-props-no-spreading */
import { Field, Form, FieldRenderProps } from 'react-final-form';
import MaskedInput from 'react-text-mask';
import Link from 'next/link';

import { useAppSelector } from 'Root/redux/hooks';
import RadioButton from 'Components/RadioButton/RadioButton';
import Toggle from 'Components/Toggle/Toggle';
import Reference from 'Components/Reference/Reference';
import Message from 'Components/Message/Message';

import validate from './helpers/validate';
import validateName from './helpers/validateName';
import validateBirthday from './helpers/validateBirthday';
import validateEmail from './helpers/validateEmail';

import styles from './signUpCard.module.scss';

type SignUpCardData = {
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  password: string,
  sex: string,
  specialOffers: boolean
};

type SignUpCardProps = {
  onSubmit: (data: SignUpCardData) => void
};

const SignUpCard = ({ onSubmit }: SignUpCardProps) => {
  const { error } = useAppSelector((store) => store.signUp);

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

  const showErrorMessage = () => {
    switch (error) {
      case 'auth/email-already-in-use':
        return (
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
        );
      case 'auth/weak-password':
        return (
          <Message type="error">
            Введенный пароль слабо защищен и должен содержать не менее 6 символов
          </Message>
        );
      default:
        return (
          <Message type="error">
            {error}
          </Message>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация аккаунта</h1>
      <Form onSubmit={onSubmit} initialValues={{ sex: 'male', specialOffers: false }}>
        {({
          handleSubmit, submitting, pristine,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              type="text"
              placeholder="Имя"
              validate={validateName}
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
              validate={validateName}
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
              validate={validateBirthday}
            >
              {({ input, meta }) => (
                <div className={styles.dateOfBirth}>
                  <div className={styles.subtitle}>Дата рождения</div>
                  {meta.error && meta.touched && <span className={styles.sign}>{meta.error}</span>}
                  <MaskedInput
                    {...input}
                    mask={[/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    className={styles.field}
                    placeholder="ДД.ММ.ГГГГ"
                  />
                </div>
              )}
            </Field>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              validate={validateEmail}
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
              validate={validate}
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
                {showErrorMessage()}
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

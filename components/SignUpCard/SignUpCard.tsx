import styles from './signUpCard.module.scss';

type SignUpCardData = {
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  password: string,
  getSpecialOffers: boolean
};

type SignUpCardProps = {
  onSubmit: (data: SignUpCardData) => void
};

const SignUpCard = (props: SignUpCardProps) => {
  const a = 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация аккаунта</h1>

    </div>
  );
};

export type { SignUpCardData };
export default SignUpCard;

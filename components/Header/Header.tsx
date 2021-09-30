import styles from './header.module.scss';

type HeaderProps = { content: string };

const Header = (props: HeaderProps) => {
  const { content } = props;

  return (
    <h1 className={styles.root}>{content}</h1>
  );
};

export default Header;

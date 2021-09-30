import styles from './header.module.scss';

type HeaderProps = { content: string };

const Header = (props: HeaderProps) => {
  return (
    <h1 className={styles.root}>{props.content}</h1>
  );
}

export default Header;

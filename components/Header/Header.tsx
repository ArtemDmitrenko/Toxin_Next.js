import { useState } from 'react';
import Link from 'next/link';

import Logo from 'Components/Logo/Logo';
import Reference from 'Components/Reference/Reference';

import styles from './header.module.scss';

type SubMenu = {
  id: number,
  name: string,
  href: string,
};

type HeaderMenu = {
  id: number,
  name: string,
  href: string,
  subMenu?: Array<SubMenu>,
};

type HeaderProps = {
  menu: Array<HeaderMenu>,
  isAuth: boolean,
  userName: string | null,
  handleLogoutButtonClick: () => void,
};

const Header = (props: HeaderProps) => {
  const mockUserName = 'Неопознанная панда';
  const {
    menu,
    isAuth = false,
    userName = mockUserName,
    handleLogoutButtonClick,
  } = props;
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false);

  const stylesSubMenu = (id: number) => (
    `${styles.subMenu} ${activeMenu === id ? styles.activeSubMenu : ''}`
  );

  const stylesArrow = (id: number) => (
    `${styles.arrow} ${activeMenu === id ? styles.arrowActive : ''}`
  );

  const stylesNavigation = () => (
    `${styles.navigation} ${isOpenBurgerMenu ? styles.navigationVisible : ''}`
  );

  const stylesButtons = () => (
    `${styles.buttons} ${isOpenBurgerMenu ? styles.buttonsVisible : ''}`
  );

  const stylesUserProfile = () => (
    `${styles.userProfile} ${isOpenBurgerMenu ? styles.userProfileVisible : ''}`
  );

  const stylesBurgerMenu = () => (
    `${styles.burger} ${isOpenBurgerMenu ? styles.burgerOpened : ''}`
  );

  const handleClick = (id: number) => (
    id === activeMenu ? setActiveMenu(null) : setActiveMenu(id)
  );

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo width={110} height={40} alt="Logo" />
        <button className={stylesBurgerMenu()} type="button" aria-label="open or close" onClick={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)} onKeyDown={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)} />
        <nav className={stylesNavigation()}>
          <ul className={styles.headerMenu}>
            {menu.map((item) => {
              const { subMenu = [] } = item;
              return (subMenu.length > 0 ? (
                <li
                  className={styles.titleSubMenu}
                  key={item.id}
                >
                  <button
                    type="button"
                    className={styles.text}
                    title={item.name}
                    onClick={() => handleClick(item.id)}
                    onKeyDown={() => handleClick(item.id)}
                  >
                    {item.name}
                    <i className={stylesArrow(item.id)} />
                  </button>
                  <ul className={stylesSubMenu(item.id)}>
                    {subMenu.map((element: SubMenu) => (
                      <li className={styles.subMenuItem} key={element.id}>
                        <Link href={element.href}>
                          <a
                            className={styles.link}
                            href={element.href}
                            title={element.name}
                          >
                            {element.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
                : (
                  <li className={styles.listItem} key={item.id}>
                    <Link href={item.href}>
                      <a className={styles.link} href={item.href} title={item.name}>{item.name}</a>
                    </Link>
                  </li>
                ));
            })}
          </ul>
        </nav>
        { isAuth ? (
          <div className={stylesUserProfile()}>
            <p className={styles.userName}>{userName || mockUserName}</p>
            <Reference
              href="/auth/log-in"
              text="Выйти"
              type="bordered"
              size="small"
              onClick={handleLogoutButtonClick}
            />
          </div>
        ) : (
          <div className={stylesButtons()}>
            <Reference href="/auth/log-in" text="Войти" type="bordered" size="small" />
            <Reference
              href="/auth/sign-up"
              text="Зарегистрироваться"
              type="solid"
              size="small"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState } from 'react';
import Link from 'next/link';

import Logo from 'Components/Logo/Logo';
import Reference from 'Components/Reference/Reference';

import styles from './header.module.scss';

type SubMenu = {
  id: number;
  name: string,
  href: string,
};

type HeaderMenu = {
  id: number;
  name: string,
  href: string,
  subMenu?: Array<SubMenu>,
};

type HeaderProps = {
  menu: Array<HeaderMenu>,
};

const Header = (props: HeaderProps) => {
  const { menu } = props;
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false);

  const stylesSubMenu = (id: number) => (
    `${styles.subMenu} ${activeMenu === id ? styles.activeSubMenu : ''}`
  );

  const stylesArrow = (id: number) => (
    `${styles.arrow} ${activeMenu === id ? styles.arrowActive : ''}`
  );

  const stylesHeader = () => (
    `${styles.header} ${isOpenBurgerMenu ? styles.headerVisible : ''}`
  );

  const stylesButtons = () => (
    `${styles.buttons} ${isOpenBurgerMenu ? styles.buttonsVisible : ''}`
  );

  const stylesBurgerMenu = () => (
    `${styles.burger} ${isOpenBurgerMenu ? styles.burgerOpened : ''}`
  );

  return (
    <div className={styles.content}>
      <Logo width={110} height={40} alt="Logo" />
      <button className={stylesBurgerMenu()} type="button" aria-label="open or close" onClick={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)} onKeyDown={() => setIsOpenBurgerMenu(!isOpenBurgerMenu)} />
      <ul className={stylesHeader()}>
        {menu.map((item) => {
          const { subMenu = [] } = item;
          return (subMenu.length > 0 ? (
            <li
              className={styles.titleSubMenu}
              key={item.id}
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
              onKeyDown={() => setActiveMenu(item.id)}
            >
              <Link href={item.href}>
                <a className={styles.link} href={item.href} title={item.name}>
                  {item.name}
                  <i className={stylesArrow(item.id)} />
                </a>
              </Link>
              <ul className={stylesSubMenu(item.id)}>
                {subMenu.map((element: SubMenu) => (
                  <li className={styles.subMenuItem} key={element.id}>
                    <Link href={element.href}>
                      <a className={styles.link} href={element.href} title={element.name}>{element.name}</a>
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
      <div className={stylesButtons()}>
        <Reference text="Войти" type="bordered" size="small" />
        <Reference text="Зарегистрироваться" type="solid" size="small" />
      </div>
    </div>
  );
};

export default Header;

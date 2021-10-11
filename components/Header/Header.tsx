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

  const stylesSubMenu = (id: number) => (
    `${styles.subMenu} ${activeMenu === id ? styles.activeSubMenu : ''}`
  );

  const stylesArrow = (id: number) => (
    `${styles.arrow} ${activeMenu === id ? styles.arrowActive : ''}`
  );

  return (
    <div className={styles.content}>
      <Logo width={110} height={40} alt="Logo" />
      <input className={styles.checkbox} type="checkbox" id="burger-menu" />
      <label className={styles.burger} htmlFor="burger-menu" />
      <ul className={styles.header}>
        {menu.map((item) => {
          const { subMenu = [] } = item;
          return (subMenu.length > 0 ? (
            <li className={styles.titleSubMenu} key={item.id} onMouseEnter={() => setActiveMenu(item.id)} onMouseLeave={() => setActiveMenu(null)}>
              <Link href={item.href}>
                <a className={styles.link} href={item.href}>
                  {item.name}
                  <i className={stylesArrow(item.id)} />
                </a>
              </Link>
              <ul className={stylesSubMenu(item.id)}>
                {subMenu.map((element: SubMenu) => (
                  <li className={styles.subMenuItem} key={element.id}>
                    <Link href={element.href}>
                      <a className={styles.link} href={element.href}>{element.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
            : (
              <li className={styles.listItem} key={item.id}>
                <Link href={item.href}>
                  <a className={styles.link} href={item.href}>{item.name}</a>
                </Link>
              </li>
            ));
        })}
      </ul>
      <div className={styles.buttons}>
        <Reference text="Войти" type="bordered" size="small" />
        <Reference text="Зарегистрироваться" type="solid" size="small" />
      </div>
    </div>
  );
};

export default Header;

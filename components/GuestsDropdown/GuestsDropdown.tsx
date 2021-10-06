import { useState } from 'react';
import styles from './guestsDropdown.module.scss';

type GuestsDropdownConfig = Array<{
  title: string,
  group: string,
  wordforms: [string, string, string],
}>;

type GuestsDropdownProps = {
  list: GuestsDropdownConfig,
};

const GuestsDropdown = (props: GuestsDropdownProps) => {
  const { list } = props;
  const defaultState = {
    isActive: false,
  };

  const [dropdown, setDropdown] = useState(defaultState);

  const handleOutputFocus = () => (setDropdown((prevState) => ({ ...prevState, isActive: true })));
  const handleOutputBlur = () => (setDropdown((prevState) => ({ ...prevState, isActive: false })));

  return (
    <div className={styles.guestsDropdown} onFocus={handleOutputFocus} onBlur={handleOutputBlur}>
      <div className={`${styles.output} ${dropdown.isActive ? styles.outputActive : ''}`}>
        <input type="text" className={`${styles.input} ${dropdown.isActive ? styles.inputActive : ''}`} placeholder="Сколько гостей" readOnly />
      </div>
      <div className={`${styles.menuWrapper} ${dropdown.isActive ? styles.menuWrapperActive : ''}`}>
        <div tabIndex={0} role="menu" className={styles.menu}>
          <ul className={styles.list}>
            {list.map((item) => (
              <li key={item.title} className={styles.item}>
                <div>{item.title}</div>
                <div className={styles.control}>
                  <div className={styles.minus} tabIndex={0} role="button"> - </div>
                  <div className={styles.counter}> 0 </div>
                  <div className={styles.plus} tabIndex={0} role="button"> + </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={`${styles.buttons} ${styles.buttonsNonEmpty}`}>
            <button type="button" className={`${styles.button} ${styles.buttonClear}`}>Очистить</button>
            <button type="button" className={`${styles.button} ${styles.buttonApply}`} onClick={handleOutputBlur}>Применить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { GuestsDropdownConfig };
export default GuestsDropdown;

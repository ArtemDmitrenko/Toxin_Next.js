import { createVisible, createHidden } from 'redux/guestsDropdown/guestsDropdownActions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from './guestsDropdown.module.scss';

type GuestsDropdownConfig = Array<{
  title: string,
  wordforms: [string, string, string],
}>;

interface GuestsDropdownProps {
  list: GuestsDropdownConfig,
}

const GuestsDropdown = (props: GuestsDropdownProps) => {
  const { list } = props;

  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.guestsDropdown.isActive);

  const handleOutputFocus = () => dispatch(createVisible());
  const handleOutputBlur = () => dispatch(createHidden());

  return (
    <div className={styles.guestsDropdown} onFocus={handleOutputFocus} onBlur={handleOutputBlur}>
      <div className={`${styles.output} ${isActive ? styles.outputActive : ''}`}>
        <input type="text" className={`${styles.input} ${isActive ? styles.inputActive : ''}`} placeholder="Сколько гостей" readOnly />
      </div>
      <div tabIndex={0} role="menu" className={`${styles.menu} ${isActive ? styles.menuActive : ''}`}>
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
          <button type="button" className={`${styles.button} ${styles.buttonApply}`}>Применить</button>
        </div>
      </div>
    </div>
  );
};

export type { GuestsDropdownConfig };
export default GuestsDropdown;

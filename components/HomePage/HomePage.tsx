import Logo from 'Components/Logo/Logo';
import GuestsDroprown, { GuestsDropdownConfig } from 'Components/GuestsDropdown/GuestsDropdown';

import styles from './homePage.module.scss';

const HomePage = () => {
  const guestsDropdownConfig: GuestsDropdownConfig = [
    {
      title: 'Взрослые',
      group: 'guests',
      wordforms: ['гость', 'гостя', 'гостей'],
    },
    {
      title: 'Дети',
      group: 'guests',
      wordforms: ['гость', 'гостя', 'гостей'],
    },
    {
      title: 'Младенцы',
      group: 'babies',
      wordforms: ['младенец', 'младенца', 'младенцев'],
    },
  ];

  return (
    <div className={styles.root}>
      <Logo width={106} height={40} alt="Toxin hotel logo" />
      <GuestsDroprown list={guestsDropdownConfig} />
    </div>
  );
};

export default HomePage;

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
      <GuestsDroprown list={guestsDropdownConfig} />
    </div>
  );
};

export default HomePage;

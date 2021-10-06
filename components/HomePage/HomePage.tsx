import GuestsDroprown, { GuestsDropdownConfig } from 'components/GuestsDropdown/GuestsDropdown';

import styles from './homePage.module.scss';

const HomePage = () => {
  const guestsDropdownConfig: GuestsDropdownConfig = [
    {
      title: 'Взрослые',
      wordforms: ['гость', 'гостя', 'гостей'],
    },
    {
      title: 'Дети',
      wordforms: ['гость', 'гостя', 'гостей'],
    },
    {
      title: 'Младенцы',
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

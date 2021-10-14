import RangeSlider from 'Components/RangeSlider/RangeSlider';

import styles from './homePage.module.scss';

const HomePage = () => (
  <div className={styles.root}>
    <RangeSlider
      min={0}
      max={15000}
      valueFrom={0}
      valueTo={15000}
      step={100}
    />
  </div>
);

export default HomePage;

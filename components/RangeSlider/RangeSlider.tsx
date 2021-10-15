import { useState } from 'react';
import ReactSlider from 'react-slider';

import styles from './rangeSlider.module.scss';

type RangeSliderProps = {
  min: number,
  max: number,
  valueFrom: number,
  valueTo: number,
  step?: number,
  pearling?: boolean,
  minDistance?: number,
  title?: string,
  postfix?: string,
  onChange?: (values:Array<number>) => void,
};

const RangeSlider = (props: RangeSliderProps) => {
  const {
    min,
    max,
    valueFrom,
    valueTo,
    step,
    pearling,
    minDistance,
    title,
    postfix,
    onChange,
  } = props;

  const [values, setValues] = useState([valueFrom, valueTo]);

  const handleRangeSliderChange = (newValues: Array<number>) => {
    setValues(newValues);

    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <input
          className={styles.outputField}
          value={`${values[0]}${postfix} – ${values[1]}${postfix}`}
        />
      </div>
      <ReactSlider
        min={min}
        max={max}
        step={step}
        value={values}
        minDistance={minDistance}
        pearling={pearling}
        onChange={handleRangeSliderChange}
        className={styles.rangeSlider}
        thumbClassName={styles.exampleThumb}
        trackClassName={styles.exampleTrack}
      />
    </div>
  );
};

RangeSlider.defaultProps = {
  step: 1,
  pearling: false,
  minDistance: 0,
  title: 'range slider',
  postfix: '',
  onChange: undefined,
};

export default RangeSlider;

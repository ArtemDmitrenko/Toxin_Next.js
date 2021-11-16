import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

import validateStr from './helpers/validateStr';
import valuesWrapper from './helpers/valuesWrapper';

import styles from './rangeSlider.module.scss';

type RangeSliderData = Array<number>;

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
  onChange?: (values: RangeSliderData) => void,
};

const RangeSlider = (props: RangeSliderProps) => {
  const {
    min,
    max,
    valueFrom,
    valueTo,
    onChange,
    step = 1,
    pearling = false,
    minDistance = 0,
    title = 'range slider',
    postfix = '',
  } = props;

  const [values, setValues] = useState([valueFrom, valueTo]);
  const [input, setInput] = useState(valuesWrapper([valueFrom, valueTo], postfix));

  useEffect(() => {
    if (onChange) onChange(values);
  }, [values]);

  const validateArr = (arr: RangeSliderData | null) => {
    if (!arr) return null;

    let [valFrom, valTo] = arr;

    if (valFrom > valTo) {
      [valFrom, valTo] = [valTo, valFrom];
    }

    if (valFrom < min) valFrom = min;
    if (valTo > max) valTo = max;

    if (valFrom > max) valFrom = valTo - step;
    if (valTo < min) valTo = valFrom + step;

    return [valFrom, valTo];
  };

  const updateRangeSlider = (target: HTMLInputElement) => {
    const newValues = validateArr(validateStr(target.value, postfix));

    if (newValues) {
      setValues(newValues);
      setInput(valuesWrapper(newValues, postfix));
    } else {
      setInput(valuesWrapper(values, postfix));
    }
  };

  const handleRangeSliderAfterChange = (newValues: RangeSliderData) => {
    setValues(newValues);
  };

  const handleRangeSliderChange = (newValues: RangeSliderData) => {
    setInput(valuesWrapper(newValues, postfix));
  };

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(target.value);
  };

  const handleInputBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    updateRangeSlider(target);
  };

  const handleInputKeyPress = ({ target, key }: React.KeyboardEvent<HTMLInputElement>) => {
    const isTargetCorrect = target instanceof HTMLInputElement && key === 'Enter';

    if (isTargetCorrect) {
      updateRangeSlider(target);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <input
          className={styles.outputField}
          value={input}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
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
        onAfterChange={handleRangeSliderAfterChange}
        className={styles.rangeSlider}
        thumbClassName={styles.exampleThumb}
        trackClassName={styles.exampleTrack}
      />
    </div>
  );
};

export type { RangeSliderData };
export default RangeSlider;

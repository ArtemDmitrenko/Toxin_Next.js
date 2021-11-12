import { useState } from 'react';

import styles from './impressions.module.scss';

type ImpressionsProps = {
  amazing?: number,
  good?: number,
  satisfactorily?: number,
  bad?: number
};

const Impressions = (props: ImpressionsProps) => {
  const {
    amazing = 0,
    good = 0,
    satisfactorily = 0,
    bad = 0,
  } = props;

  const lengthOfCircle: number = 364.424672;
  const sum: number = Object.values(props).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
  );

  const [currentReviewsValue, setCurrentReviewsValue] = useState<number>(sum);
  const [activeImpression, setActiveImpression] = useState<string | null>(null);

  const calcLengthOfOneReview = (number: number): number => (lengthOfCircle * number) / sum;
  const goodInPixels = calcLengthOfOneReview(good);
  const amazingInPixels = calcLengthOfOneReview(amazing);
  const satisfactorilyInPixels = calcLengthOfOneReview(satisfactorily);
  const badInPixels = calcLengthOfOneReview(bad);

  const stylesCircle = (amount: number, impression: string) => {
    const classesArr = [styles.unit];

    if (amount === 0) classesArr.push(styles.hide);
    if (impression === activeImpression) classesArr.push(styles.unitActive);

    return classesArr.join(' ');
  };

  const handleImpressionMouseMove = (amount: number, impression: string) => {
    setCurrentReviewsValue(amount);
    setActiveImpression(impression);
  };

  const handleImpressionMouseOut = () => {
    setCurrentReviewsValue(sum);
    setActiveImpression(null);
  };

  return (
    <div>
      <h2 className={styles.title}>Впечатления от номера</h2>
      <div className={styles.diagram}>
        <div className={styles.block}>
          <svg width="125" height="125" viewBox="0 0 125 125">
            <linearGradient id="linear-gradient-yellow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFE39C" />
              <stop offset="100%" stopColor="#FFBA9C" />
            </linearGradient>
            <linearGradient id="linear-gradient-green" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6FCF97" />
              <stop offset="100%" stopColor="#66D2EA" />
            </linearGradient>
            <linearGradient id="linear-gradient-purple" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#BC9CFF" />
              <stop offset="100%" stopColor="#8BA4F9" />
            </linearGradient>
            <linearGradient id="linear-gradient-black" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#909090" />
              <stop offset="100%" stopColor="#3D4975" />
            </linearGradient>
            <circle
              className={stylesCircle(good, 'good')}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-green)"
              strokeDasharray={`${goodInPixels - 2} ${lengthOfCircle}`}
              strokeDashoffset="-1"
            />
            <circle
              className={stylesCircle(amazing, 'amazing')}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-yellow)"
              strokeDasharray={`${amazingInPixels - 2} ${lengthOfCircle}`}
              strokeDashoffset={`${-(goodInPixels + 1)}`}
            />
            <circle
              className={stylesCircle(satisfactorily, 'satisfactorily')}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-purple)"
              strokeDasharray={`${satisfactorilyInPixels - 2} ${lengthOfCircle}`}
              strokeDashoffset={`${-(goodInPixels + amazingInPixels + 1)}`}
            />
            <circle
              className={stylesCircle(bad, 'bad')}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-black)"
              strokeDasharray={`${badInPixels - 2} ${lengthOfCircle}`}
              strokeDashoffset={`${-(goodInPixels + amazingInPixels + satisfactorilyInPixels + 1)}`}
            />
          </svg>
          <h1 className={styles.total}>
            {currentReviewsValue}
            <span>голосов</span>
          </h1>
        </div>
        <div className={styles.legend}>
          <ul className={styles.list}>
            <li
              className={`${styles.item} ${styles.amazing}`}
              onMouseMove={() => { handleImpressionMouseMove(amazing, 'amazing'); }}
              onFocus={() => { handleImpressionMouseMove(amazing, 'amazing'); }}
              onMouseOut={handleImpressionMouseOut}
              onBlur={handleImpressionMouseOut}
            >
              Великолепно
            </li>
            <li
              className={`${styles.item} ${styles.good}`}
              onMouseMove={() => { handleImpressionMouseMove(good, 'good'); }}
              onFocus={() => { handleImpressionMouseMove(good, 'good'); }}
              onMouseOut={handleImpressionMouseOut}
              onBlur={handleImpressionMouseOut}
            >
              Хорошо
            </li>
            <li
              className={`${styles.item} ${styles.satisfactorily}`}
              onMouseMove={() => { handleImpressionMouseMove(satisfactorily, 'satisfactorily'); }}
              onFocus={() => { handleImpressionMouseMove(satisfactorily, 'satisfactorily'); }}
              onMouseOut={handleImpressionMouseOut}
              onBlur={handleImpressionMouseOut}
            >
              Удовлетворительно
            </li>
            <li
              className={`${styles.item} ${styles.bad}`}
              onMouseMove={() => { handleImpressionMouseMove(bad, 'bad'); }}
              onFocus={() => { handleImpressionMouseMove(bad, 'bad'); }}
              onMouseOut={handleImpressionMouseOut}
              onBlur={handleImpressionMouseOut}
            >
              Разочарован
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Impressions;

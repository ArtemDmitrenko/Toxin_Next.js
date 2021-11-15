import styles from './impressions.module.scss';

const CIRCLE_LENGTH = 364.424672;

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

  const sum: number = amazing + good + satisfactorily + bad;

  const calcLengthOfOneReview = (number: number): number => (CIRCLE_LENGTH * number) / sum;

  const goodInPixels = calcLengthOfOneReview(good);
  const amazingInPixels = calcLengthOfOneReview(amazing);
  const satisfactorilyInPixels = calcLengthOfOneReview(satisfactorily);
  const badInPixels = calcLengthOfOneReview(bad);

  const stylesCircle = (amount: number) => (
    `${styles.unit} ${amount === 0 ? styles.hide : ''}`
  );

  return (
    <div>
      <h2 className={styles.title}>Впечатления от номера</h2>
      <div className={styles.diagram}>
        <div className={styles.block}>
          <svg width="120" height="120" viewBox="0 0 120 120">
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
              className={stylesCircle(good)}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-green)"
              strokeDasharray={`${goodInPixels - 2} ${CIRCLE_LENGTH}`}
              strokeDashoffset="-1"
            />
            <circle
              className={stylesCircle(amazing)}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-yellow)"
              strokeDasharray={`${amazingInPixels - 2} ${CIRCLE_LENGTH}`}
              strokeDashoffset={`${-(goodInPixels + 1)}`}
            />
            <circle
              className={stylesCircle(satisfactorily)}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-purple)"
              strokeDasharray={`${satisfactorilyInPixels - 2} ${CIRCLE_LENGTH}`}
              strokeDashoffset={`${-(goodInPixels + amazingInPixels + 1)}`}
            />
            <circle
              className={stylesCircle(bad)}
              r="58"
              cx="50%"
              cy="50%"
              stroke="url(#linear-gradient-black)"
              strokeDasharray={`${badInPixels - 2} ${CIRCLE_LENGTH}`}
              strokeDashoffset={`${-(goodInPixels + amazingInPixels + satisfactorilyInPixels + 1)}`}
            />
          </svg>
          <h1 className={styles.total}>
            {sum}
            <span>голосов</span>
          </h1>
        </div>
        <div className={styles.legend}>
          <ul className={styles.list}>
            <li className={`${styles.item} ${styles.amazing}`}>Великолепно</li>
            <li className={`${styles.item} ${styles.good}`}>Хорошо</li>
            <li className={`${styles.item} ${styles.satisfactorily}`}>Удовлетворительно</li>
            <li className={`${styles.item} ${styles.bad}`}>Разочарован</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Impressions;

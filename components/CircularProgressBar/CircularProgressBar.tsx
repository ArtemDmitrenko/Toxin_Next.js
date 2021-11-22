import styles from './circularProgressBar.module.scss';

type CircleProps = {
  sqSize: number,
  strokeWidth: number,
  textLength: number,
  maxLength: number,
};

const CircularProgressBar = (props: CircleProps) => {
  const {
    sqSize,
    strokeWidth,
    textLength,
    maxLength,
  } = props;

  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;

  const percentage = Math.round((textLength * 100) / maxLength);
  const percentages = textLength === 0 ? 100 : percentage;
  const dashOffset = dashArray - (dashArray * percentages) / 100;

  const isFromZeroToHalf = percentage > 0 && percentage < 50;
  const isFromHalfToMax = percentage >= 50 && percentage <= 100;

  const progressColor = (baseClass: string): string => {
    const colorClasses: Array<string> = [baseClass];

    if (isFromZeroToHalf) colorClasses.push(styles.progressLessThenHalf);
    if (isFromHalfToMax) colorClasses.push(styles.progressMoreThenHalf);

    return colorClasses.join(' ');
  };

  const textColor = (baseClass: string): string => {
    const colorClasses: Array<string> = [baseClass];

    if (isFromZeroToHalf) colorClasses.push(styles.textLessThenHalf);
    if (isFromHalfToMax) colorClasses.push(styles.textMoreThenHalf);

    return colorClasses.join(' ');
  };

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
    >
      <circle
        className={styles.background}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={progressColor(styles.progress)}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className={textColor(styles.text)}
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
      >
        {`${textLength}`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;

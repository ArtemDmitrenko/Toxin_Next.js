import styles from './dateRange.module.scss';

type DateRangeProps = {
  headers: Array<string>,
  placeholder: string,
};

function DateRange({ headers, placeholder }: DateRangeProps) {
  const [arrival, departure] = headers;
  const arrowClasses = `${styles.arrow} ${styles.arrowDown}`;

  return (
    <section className={styles.container}>
      <div>
        <h3 className={styles.header}>{arrival}</h3>
        <div className={styles.wrapper}>
          <input className={styles.field} type="text" placeholder={placeholder} />
          <div className={arrowClasses} />
        </div>
      </div>
      <div>
        <h3 className={styles.header}>{departure}</h3>
        <div className={styles.wrapper}>
          <input className={styles.field} type="text" placeholder={placeholder} />
          <div className={arrowClasses} />
        </div>
      </div>
    </section>
  );
}

export default DateRange;

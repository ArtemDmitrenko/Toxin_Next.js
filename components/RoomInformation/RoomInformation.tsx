import styles from './roomInformation.module.scss';

type RoomInformationProps = {
  heading: string,
  info: Array<{
    title: string,
    description: string,
    iconName: string
  }>
};

const RoomInformation = (props: RoomInformationProps) => {
  const { heading, info } = props;

  const stylesItem = (isLastItem: boolean) => (
    `${styles.item} ${isLastItem ? '' : styles.bordered}`
  );

  const stylesIcon = (iconName: string) => (
    `${styles.icon} ${(iconName === 'mood') ? styles.mood : ''}
      ${(iconName === 'locationCity') ? styles.locationCity : ''}
      ${(iconName === 'whatshot') ? styles.whatshot : ''}`
  );

  return (
    <div className={styles.information}>
      <h2 className={styles.heading}>{heading}</h2>
      {info.length ? (
        info.map((item, index) => {
          const isLastItem = index === info.length - 1;

          return (
            <div className={stylesItem(isLastItem)} key={item.iconName}>
              <span className={stylesIcon(item.iconName)} />
              <div className={styles.content}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.text}>{item.description}</span>
              </div>
            </div>
          );
        })
      ) : (
        <p className={styles.text}>Дополнительные сведения о номере отсутствуют</p>
      )}
    </div>
  );
};

export default RoomInformation;

import Layout from 'Components/Layout/Layout';
import Collage from 'Components/Collage/Collage';
import Comment from 'Components/Comment/Comment';
import RulesList from 'Components/RulesList/RulesList';
import RoomInformation from 'Components/RoomInformation/RoomInformation';

import mockData from 'Root/public/room-mock/room.json';
import userComment from 'Components/Comment/comment.json';
import rulesList from 'Components/RulesList/rulesList.json';
import roomInformation from 'Components/RoomInformation/roomInformation.json';

import styles from './room.module.scss';

type RoomProps = {
  data: {
    room: number,
    isLux: boolean,
    cost: number,
    rating: number,
    reviews: number,
    images: Array<{
      alt: string,
      src: string
    }>
  },
};

const Room = (props: RoomProps) => {
  const { data } = props;

  return (
    <Layout title={`Room ${data.room}`}>
      <Collage images={data.images} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.information}>
            <RoomInformation heading="Сведения о номере" info={roomInformation} />
            <section className={styles.chart}>
              <h2 className={styles.header}>Впечатления от номера</h2>
              <div className={styles.mockChart} />
            </section>
            <section className={styles.feedback}>
              <h2 className={styles.header}>Отзывы посетителей номера</h2>
              <Comment
                srcIcon={userComment.srcIcon}
                userName={userComment.userName}
                date={new Date(userComment.date)}
                text={userComment.text}
                like={userComment.like}
                onChange={() => {}}
              />
              <Comment
                srcIcon={userComment.srcIcon}
                userName={userComment.userName}
                date={new Date(userComment.date)}
                text={userComment.text}
                like={userComment.like}
                onChange={() => {}}
              />
            </section>
            <RulesList
              rulesHeader="Правила"
              rulesList={rulesList}
            />
            <div className={styles.cancel}>
              <h2 className={styles.header}>Отмена</h2>
              <p className={styles.cancelText}>
                Бесплатная отмена в течение 48 ч.
                После&nbsp;этого при отмене не позднее
                чем&nbsp;за 5 дн. до прибытия вы получите
                полный возврат за вычетом сбора за услуги.
              </p>
            </div>
          </div>
          <div className={styles.bookingCard}>
            <div className={styles.bookingMockCard} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const getServerSideProps = async () => {
  const data = mockData;

  return { props: { data } };
};

export { getServerSideProps };
export default Room;

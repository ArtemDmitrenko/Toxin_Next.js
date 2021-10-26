import mockData from 'Root/public/room-mock/room.json';
import Layout from 'Components/Layout/Layout';
import Collage from 'Components/Collage/Collage';
import RulesList from 'Components/RulesList/RulesList';
import RoomInformation from 'Components/RoomInformation/RoomInformation';
import Comments from 'Components/Comments/Comments';
import Impressions from 'Components/Impressions/Impressions';
import { CommentProps } from 'Components/Comment/Comment';
import userComments from 'Components/Comments/comments.json';
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

const handleCommentsChange = (commentList: Array<CommentProps>) => {
  console.log(commentList);
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
            <div className={styles.chart}>
              <Impressions amazing={130} good={65} satisfactorily={65} />
            </div>
            <div className={styles.feedback}>
              <Comments
                comments={userComments}
                onChange={handleCommentsChange}
              />
            </div>
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

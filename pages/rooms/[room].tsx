import { GetServerSideProps } from 'next';

import mockData from 'Root/public/rooms-mock/rooms.json';
import { DropdownConfig } from 'Root/components/Dropdown/Dropdown';
import Layout from 'Components/Layout/Layout';
import Collage from 'Components/Collage/Collage';
import Comments from 'Components/Comments/Comments';
import RulesList from 'Components/RulesList/RulesList';
import Impressions from 'Components/Impressions/Impressions';
import RoomInformation from 'Components/RoomInformation/RoomInformation';
import ReservationCard, { Service } from 'Components/ReservationCard/ReservationCard';
import userComments from 'Components/Comments/comments.json';
import rulesList from 'Components/RulesList/rulesList.json';
import roomInformation from 'Components/RoomInformation/roomInformation.json';

import styles from './room.module.scss';

type RoomProps = {
  data: {
    room: number,
    level: string,
    cost: number,
    rating: number,
    reviews: number,
    images: Array<{
      alt: string,
      src: string
    }>
  },
};

const guestDropdown: DropdownConfig = [
  {
    title: 'взрослые',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 2,
  },
  {
    title: 'дети',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 1,
  },
  {
    title: 'младенцы',
    group: 'babies',
    wordforms: ['младенец', 'младенца', 'младенцев'],
    defaultValue: 1,
  },
];

const service: Service = {
  discount: 2179,
  serviceCost: 0,
  extraServiceCost: 300,
};

const Room = (props: RoomProps) => {
  const { data } = props;

  return (
    <Layout title={`Room ${data.room}`}>
      <Collage images={data.images.slice(0, 3)} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.information}>
            <RoomInformation heading="Сведения о номере" info={roomInformation} />
          </div>
          <div className={styles.chart}>
            <Impressions amazing={130} good={65} satisfactorily={65} />
          </div>
          <div className={styles.feedback}>
            <Comments
              comments={userComments}
              onChange={() => {}}
            />
          </div>
          <div className={styles.rules}>
            <RulesList
              rulesHeader="Правила"
              rulesList={rulesList}
            />
          </div>
          <div className={styles.cancel}>
            <h2 className={styles.header}>Отмена</h2>
            <p className={styles.cancelText}>
              Бесплатная отмена в течение 48 ч.
              После&nbsp;этого при отмене не позднее
              чем&nbsp;за 5 дн. до прибытия вы получите
              полный возврат за вычетом сбора за услуги.
            </p>
          </div>
          <div className={styles.bookingCard}>
            <ReservationCard
              roomNumber={data.room}
              level={data.level}
              cost={data.cost}
              datesOfStay={{ arrival: '2019-08-19', departure: '2019-08-23' }}
              guests={guestDropdown}
              service={service}
              onSubmit={() => {}}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const { room } = context.query;

  const data = mockData.find((roomNumber) => (
    roomNumber.room === Number(room)
  ));

  return { props: { data } };
};

export { getServerSideProps };
export default Room;

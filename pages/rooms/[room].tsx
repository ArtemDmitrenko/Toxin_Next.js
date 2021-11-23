import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { addNewCommentRequest } from 'Root/redux/comment/commentActions';
import { DropdownConfig } from 'Root/components/Dropdown/Dropdown';
import { clearRoom, requestRoom } from 'Root/redux/room/roomActions';
import { likeUpdate } from 'Root/redux/like/likeActions';
import { useAppDispatch, useAppSelector } from 'Root/redux/hooks';
import { usersRequest } from 'Root/redux/users/usersActions';
import addDaysToDate from 'Root/utils/addDaysToDate';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

import { ReviewCardData } from 'Components/ReviewCard/ReviewCard';
import Layout from 'Components/Layout/Layout';
import Collage from 'Components/Collage/Collage';
import Comments from 'Components/Comments/Comments';
import { CommentProps } from 'Components/Comment/Comment';
import RulesList from 'Components/RulesList/RulesList';
import Impressions from 'Components/Impressions/Impressions';
import RoomInformation from 'Components/RoomInformation/RoomInformation';
import ReservationCard, { Service } from 'Components/ReservationCard/ReservationCard';
import rulesList from 'Components/RulesList/rulesList.json';
import formattingDate from 'Components/DateRange/helpers/formattingDate';
import { setRoomSearchData } from 'Root/redux/roomSearch/roomSearchActions';
import { DatesOfStay } from 'Components/DateRange/DateRange';
import LoadingSpinner from 'Components/LoadingSpinner/LoadingSpinner';

import styles from './room.module.scss';

type RoomProps = {
  roomNumber: string,
};

const guestDropdown: DropdownConfig = [
  {
    title: 'взрослые',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 0,
  },
  {
    title: 'дети',
    group: 'adults',
    wordforms: ['гость', 'гостя', 'гостей'],
    defaultValue: 0,
  },
  {
    title: 'младенцы',
    group: 'babies',
    wordforms: ['младенец', 'младенца', 'младенцев'],
    defaultValue: 0,
  },
];

const service: Service = {
  discount: 2179,
  serviceCost: 0,
  extraServiceCost: 300,
};

const Room = (props: RoomProps) => {
  const { roomNumber } = props;

  const dispatch = useAppDispatch();

  const data: FirebaseDocumentType = useAppSelector((store) => store.room);

  const roomSearch = useAppSelector((state) => state.roomSearch);
  const { datesOfStay } = roomSearch;
  const { arrival, departure } = datesOfStay;
  const { numberOfGuests } = roomSearch;

  useEffect(() => {
    dispatch(requestRoom({ roomNumber }));
    dispatch(usersRequest());

    return () => {
      dispatch(clearRoom());
    };
  }, []);

  const setDefDateRange = (): DatesOfStay => {
    if (arrival && departure) {
      const usFormatDateArrival = arrival.split('.').reverse().join('-');
      const usFormatDateDeparture = departure.split('.').reverse().join('-');
      return {
        arrival: usFormatDateArrival,
        departure: usFormatDateDeparture,
      };
    }
    const roomSearchState = {
      ...roomSearch,
      datesOfStay: {
        arrival: formattingDate(new Date()),
        departure: formattingDate(addDaysToDate(new Date(), 3)),
      },
    };
    dispatch(setRoomSearchData(roomSearchState));
    return {
      arrival: formattingDate(new Date()).split('.').reverse().join('-'),
      departure: formattingDate(addDaysToDate(new Date(), 3)).split('.').reverse().join('-'),
    };
  };

  const getGuestDropdown = (): DropdownConfig => {
    if (numberOfGuests.adults) {
      guestDropdown[0].defaultValue = roomSearch.numberOfGuests.adults.items.item0.value;
      guestDropdown[1].defaultValue = roomSearch.numberOfGuests.adults.items.item1.value;
      guestDropdown[2].defaultValue = roomSearch.numberOfGuests.babies.items.item0.value;
    }
    return guestDropdown;
  };

  const handleChangeComment = (comments: Array<CommentProps>) => {
    dispatch(likeUpdate({ roomNumber, comments }));
  };

  const handleCommentsSubmit = (commentData: ReviewCardData) => {
    const { userId, text } = commentData;

    dispatch(addNewCommentRequest({ userId, text, roomNumber }));
  };

  return data !== null ? (
    <Layout title={`Room ${data.room}`}>
      <Collage images={data.images.slice(0, 3)} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.information}>
            <RoomInformation heading="Сведения о номере" info={data.details} />
          </div>
          <div className={styles.chart}>
            <Impressions
              amazing={data.reviews.amazing}
              good={data.reviews.good}
              satisfactorily={data.reviews.satisfactory}
              bad={data.reviews.bad}
            />
          </div>
          <div className={styles.feedback}>
            <Comments
              comments={data.commentaries}
              onChange={handleChangeComment}
              onSubmit={handleCommentsSubmit}
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
              datesOfStay={setDefDateRange()}
              guests={getGuestDropdown()}
              service={service}
              onSubmit={() => { }}
            />
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout title="Loading">
      <div className={styles.wrapper}>
        <LoadingSpinner />
      </div>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const roomNumber = context.params?.room;

  if (typeof roomNumber !== 'string') {
    return {
      notFound: true,
    };
  }

  return { props: { roomNumber } };
};

export { getServerSideProps };
export default Room;

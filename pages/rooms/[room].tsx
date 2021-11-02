import mockData from 'Root/public/room-mock/room.json';
import Collage from 'Components/Collage/Collage';
import Tooltip from 'Components/Tooltip/Tooltip';
import RulesList from 'Components/RulesList/RulesList';
import ReservationCard, { Service } from 'Components/ReservationCard/ReservationCard';
import { DropdownConfig } from 'Root/components/Dropdown/Dropdown';

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

const rulesList = [
  { id: '0', title: 'Нельзя с питомцами' },
  { id: '1', title: 'Без вечеринок и мероприятий' },
  { id: '2', title: 'Время прибытия — после 13:00, а\u00A0выезд до 12:00' },
];

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
    <div>
      <div>
        <Collage images={data.images} />
      </div>
      <div>
        <RulesList
          rulesHeader="правила"
          rulesList={rulesList}
        />
      </div>
      <p>
        Сбор за услуги: скидка 2 179₽
        <Tooltip text="Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться" />
      </p>
      <ReservationCard
        roomNumber={888}
        level="люкс"
        cost={9990}
        datesOfStay={{ arrival: '2019-08-19', departure: '2019-08-23' }}
        guests={guestDropdown}
        service={service}
        onSubmit={() => {}}
      />
    </div>
  );
};

const getServerSideProps = async () => {
  const data = mockData;

  return { props: { data } };
};

export { getServerSideProps };
export default Room;

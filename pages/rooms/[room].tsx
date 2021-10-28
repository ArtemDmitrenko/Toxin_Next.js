import mockData from 'Root/public/room-mock/room.json';
import Collage from 'Components/Collage/Collage';
import Tooltip from 'Components/Tooltip/Tooltip';
import RulesList from 'Components/RulesList/RulesList';

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
    </div>
  );
};

const getServerSideProps = async () => {
  const data = mockData;

  return { props: { data } };
};

export { getServerSideProps };
export default Room;

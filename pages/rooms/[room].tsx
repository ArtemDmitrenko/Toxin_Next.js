import mockData from 'Root/public/room-mock/room-card.json';
import Collage from 'Components/Collage/Collage';

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
    <div>
      <Collage images={data.images} />
    </div>
  );
};

export async function getServerSideProps() {
  const data = mockData;

  return { props: { data } };
}

export default Room;

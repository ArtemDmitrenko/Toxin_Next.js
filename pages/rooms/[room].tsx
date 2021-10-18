import mockData from 'Root/public/room-mock/room-card.json';

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
      <h1>{data.room}</h1>
      {data.images.map((image) => (
        <img src={image.src} alt={image.alt} key={image.src} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const data = mockData;

  return { props: { data } };
}

export default Room;

import roomsJSON from 'Root/public/roomsMock/rooms.json';
import Pagination from 'Components/Pagination/Pagination';

const addDatesOfState = (dates: { arrival: string, departure: string }) => {
  const datesOfState = {
    arrival: dates.arrival,
    departure: dates.departure,
  };
};

const addNewEmail = (email: string) => {
  const subscriptionData = {
    userEmail: email,
  };
};

const HomePage = () => (
  <Pagination itemsPerPage={12} allItems={roomsJSON} />
);

export default HomePage;

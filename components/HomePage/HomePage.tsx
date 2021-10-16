import Layout from 'Components/Layout/Layout';
import BackgroundWithSlogan from 'Components/BackgroundWithSlogan/BackgroundWithSlogan';

const addDatesOfState = (dates: { arrival: string, departure: string }) => {
  const datesOfState = {
    arrival: dates.arrival,
    departure: dates.departure,
  };
};

const HomePage = () => (
  <Layout title="Landing page">
    <BackgroundWithSlogan />
  </Layout>
);

export default HomePage;

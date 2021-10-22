import Layout from 'Components/Layout/Layout';
import SearchFilter from 'Components/SearchFilter/SearchFilter';

import styles from './index.module.scss';

const Rooms = () => (
  <Layout title="Rooms">
    <div className={styles.grid}>
      <SearchFilter />
      <div className={styles.roomsCell}>
        Here will be rooms
      </div>
    </div>
  </Layout>
);

export default Rooms;

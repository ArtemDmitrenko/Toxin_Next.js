import { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'Root/redux/hooks';
import { DropdownConfig } from 'Root/components/Dropdown/Dropdown';
import addDaysToDate from 'Root/utils/addDaysToDate';
import { setRoomSearchData } from 'Root/redux/roomSearch/roomSearchActions';
import Layout from 'Components/Layout/Layout';
import SearchFilter, { SearchFilterState } from 'Components/SearchFilter/SearchFilter';
import Pagination from 'Components/Pagination/Pagination';
import formattingDate from 'Components/DateRange/helpers/formattingDate';

import styles from './index.module.scss';

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

const rangeSlider = {
  min: 0,
  max: 15000,
  valueFrom: 5000,
  valueTo: 10000,
};

const checkboxRules = [
  {
    title: 'Можно курить',
    name: 'allowSmoke',
  },
  {
    title: 'Можно с питомцами',
    name: 'allowPets',
    isChecked: true,
  },
  {
    title: 'Можно пригласить гостей (до 10 человек)',
    name: 'allowGuests',
    isChecked: true,
  },
];

const checkboxAvailabilities = [
  {
    title: 'Широкий коридор',
    description: 'Ширина коридоров в номере не\xa0менее 91 см.',
    isBoldTitle: true,
    name: 'isWideHall',
    isChecked: true,
  },
  {
    title: 'Помощник для инвалидов',
    description: 'На 1 этаже вас встретит специалист и\xa0проводит до номера',
    isBoldTitle: true,
    name: 'isHelper',
  },
];

const facilitiesDropdown: DropdownConfig = [
  {
    title: 'Спальни',
    group: 'bedrooms',
    defaultValue: 2,
    wordforms: ['спальня', 'спальни', 'спален'],
  },
  {
    title: 'Кровати',
    group: 'beds',
    defaultValue: 2,
    wordforms: ['кровать', 'кровати', 'кроватей'],
  },
  {
    title: 'Ванные комнаты',
    group: 'bathrooms',
    wordforms: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  },
];

const checkboxDropdown = {
  breakfast: {
    title: 'Завтрак',
    isChecked: false,
  },
  desk: {
    title: 'Письменный стол',
    isChecked: true,
  },
  feedingChair: {
    title: 'Стул для кормления',
    isChecked: true,
  },
  crib: {
    title: 'Кроватка',
    isChecked: true,
  },
  television: {
    title: 'Телевизор',
    isChecked: false,
  },
  shampoo: {
    title: 'Шампунь',
    isChecked: false,
  },
  additionTelevision: {
    title: 'Телевизор',
    isChecked: false,
  },
  additionShampoo: {
    title: 'Шампунь',
    isChecked: false,
  },
};

const Rooms = () => {
  const roomSearch = useAppSelector((state) => state.roomSearch);
  const { datesOfStay } = roomSearch;
  const { numberOfGuests } = roomSearch;
  const { arrival, departure } = datesOfStay;

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState(false);
  const [filterConstraints, setFilterConstraints] = useState<SearchFilterState>();

  const getGuestDropdown = () => {
    if (numberOfGuests.adults) {
      guestDropdown[0].defaultValue = numberOfGuests.adults.items.item0.value;
      guestDropdown[1].defaultValue = numberOfGuests.adults.items.item1.value;
      guestDropdown[2].defaultValue = numberOfGuests.babies.items.item0.value;
    }
    return guestDropdown;
  };

  const setDefDateRange = () => {
    if (arrival && departure) {
      const usFormatDateArrival = arrival.split('.').reverse().join('-');
      const usFormatDateDeparture = departure.split('.').reverse().join('-');
      return {
        defaultValues: [
          new Date(usFormatDateArrival),
          new Date(usFormatDateDeparture),
        ],
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
      defaultValues: [
        new Date(),
        addDaysToDate(new Date(), 3),
      ],
    };
  };

  const handleFilterChange = (data: SearchFilterState) => {
    let roomSearchState = roomSearch;
    if (data.dateRange) {
      const filterDatesOfStay = {
        arrival: data.dateRange?.arrival,
        departure: data.dateRange?.departure,
      };
      roomSearchState = {
        datesOfStay: filterDatesOfStay,
      };
      dispatch(setRoomSearchData(roomSearchState));
    }
    if (data.guestsDropdown) {
      roomSearchState = {
        numberOfGuests: data.guestsDropdown,
      };
      dispatch(setRoomSearchData(roomSearchState));
    }

    setFilterConstraints(data);
  };

  const handleFilterToggle = () => { setFilter((prevState) => !prevState); };

  const stylesFilterGroup = () => (
    `${styles.filterGroup} ${filter ? styles.filterGroupActive : ''}`
  );

  const stylesFilter = () => (
    `${styles.filter} ${filter ? styles.filterActive : ''}`
  );

  const stylesButton = () => (
    `${styles.filterButton} ${filter ? styles.filterButtonActive : ''}`
  );

  return (
    <Layout title="Rooms">
      <div className={styles.grid}>
        <div className={stylesFilterGroup()}>
          <div className={stylesFilter()}>
            <div className={styles.filterWrapper}>
              <SearchFilter
                dateRangeConfig={setDefDateRange()}
                guestsDropdownConfig={getGuestDropdown()}
                rangeSliderConfig={rangeSlider}
                checkboxRulesConfig={checkboxRules}
                checkboxAvailabilitiesConfig={checkboxAvailabilities}
                facilitiesDropdownConfig={facilitiesDropdown}
                checkboxDropdownConfig={checkboxDropdown}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <button className={stylesButton()} type="button" onClick={handleFilterToggle} />
        </div>
        <div className={styles.rooms}>
          <h1 className={styles.title}>Номера, которые мы для вас подобрали</h1>
          <Pagination limit={12} filterConstraints={filterConstraints} />
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;

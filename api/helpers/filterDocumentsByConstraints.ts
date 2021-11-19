import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';
import areDateRangesOverlap from 'Root/utils/areDateRangesOverlap';
import { SearchFilterState } from 'Components/SearchFilter/SearchFilter';

const filterDocumentsByConstraints = (
  docs: Array<QueryDocumentSnapshot<DocumentData>>,
  filter?: SearchFilterState,
) => {
  const filteredDocs: Array<QueryDocumentSnapshot<DocumentData>> = [];

  if (!filter) return docs;

  const checkAreConditions = (
    data: { [key: string]: boolean },
    filterField: 'checkboxRules' | 'checkboxAvailability',
  ) => {
    let isMatch = true;

    Object.keys(data).forEach((key) => {
      const valuesAreNotEqual = filter[filterField][key] && !data[key];

      if (valuesAreNotEqual) isMatch = false;
    });

    return isMatch;
  };

  const checkAreAdditions = (data: { [key: string]: boolean }) => {
    let isMatch = true;

    Object.keys(data).forEach((key) => {
      const valuesAreNotEqual = filter.checkboxDropdown[key]?.isChecked && !data[key];

      if (valuesAreNotEqual) isMatch = false;
    });

    return isMatch;
  };

  docs.forEach((doc) => {
    const data = doc.data() as FirebaseDocumentType;

    const [from, to] = filter.rangeSlider;

    if (data.cost < from || data.cost > to) return;
    if (!checkAreConditions(data.rules, 'checkboxRules')) return;
    if (!checkAreConditions(data.accessibility, 'checkboxAvailability')) return;
    if (filter.facilitiesData.bedrooms > data.facilities.bedrooms) return;
    if (filter.facilitiesData.beds > data.facilities.beds) return;
    if (filter.facilitiesData.bathrooms > data.facilities.bathrooms) return;
    if (!checkAreAdditions(data.additions)) return;
    if (areDateRangesOverlap(filter.dateRange, data.reserved)) return;

    filteredDocs.push(doc);
  });

  return filteredDocs;
};

export default filterDocumentsByConstraints;

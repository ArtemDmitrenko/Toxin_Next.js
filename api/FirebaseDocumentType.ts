import { Timestamp } from "@firebase/firestore";

type FirebaseDocumentType = {
  room: number,
  level: string,
  cost: number,
  reviews: {
    terrible?: number,
    bad?: number,
    satisfactory?: number,
    good?: number,
    amazing?: number,
  },
  images: Array<{
    src: string,
    alt: string,
  }>,
  reserved: Array<{
    userId: string,
    from: Timestamp,
    to: Timestamp,
  }>,
  rules: {
    [key: string]: boolean,
  },
  accessibility: {
    [key: string]: boolean
  },
  facilities: {
    bedrooms: number,
    beds: number,
    bathrooms: number,
  },
  additions: {
    [key: string]: boolean,
  },
  details: Array<{
    title: string,
    description: string,
    iconName: string,
  }>,
  commentaries: Array<{
    userId: string,
    date: Date,
    likes: Array<string>,
  }>,
};

export default FirebaseDocumentType;

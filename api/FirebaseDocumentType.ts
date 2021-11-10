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
    from: Date,
    to: Date,
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
    name: string,
  }>,
  commentaries: Array<{
    user: {
      name: string,
      image: string,
    },
    date: Date,
    likes: Array<string>,
  }>,
};

export default FirebaseDocumentType;

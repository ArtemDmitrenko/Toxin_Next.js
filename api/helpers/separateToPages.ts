import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

const separateToPages = (docs: Array<QueryDocumentSnapshot<DocumentData>>, limit: number) => {
  const docsArr: Array<Array<QueryDocumentSnapshot<DocumentData>>> = [];

  const totalChunks = Math.ceil(docs.length / limit);

  for (let i = 0; i < totalChunks * limit; i += limit) {
    const end = i + limit > docs.length ? docs.length : i + limit;

    docsArr.push(docs.slice(i, end));
  }

  return docsArr;
};

export default separateToPages;

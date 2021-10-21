import Image from 'next/image';

import styles from './collage.module.scss';

type CollageProps = {
  images: Array<{
    src: string,
    alt: string,
  }>,
};

const Collage = ({ images }: CollageProps) => (
  <div className={styles.collage}>
    {
      images.map((image) => (
        <div
          className={styles.aspectRatio}
          key={image.src}
        >
          <Image
            className={styles.image}
            src={image.src}
            alt={image.alt}
            layout="fill"
          />
        </div>
      ))
    }
  </div>
);

export default Collage;

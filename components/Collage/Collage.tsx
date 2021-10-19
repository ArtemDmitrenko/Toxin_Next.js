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
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          key={image.src}
        />
      ))
    }
  </div>
);

export default Collage;

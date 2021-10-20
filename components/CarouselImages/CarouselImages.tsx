import { useState } from 'react';

import styles from './carouselImages.module.scss';

type CarouselImagesProps = {
  data: {
    images: Array<{ id: number, src: string, alt: string }>,
  }
};

const CarouselImages = (props: CarouselImagesProps) => {
  const { data } = props;
  const { images } = data;

  const [active, setActive] = useState<number>(0);

  const stylesContent = (id: number) => (
    `${styles.content} ${active === id ? styles.active : ''}`
  );

  const stylesDot = (id: number) => (
    `${styles.dot} ${active === id ? styles.activeDot : ''}`
  );

  const showSlides = (index: number) => {
    if (index > images.length - 1) {
      setActive(0);
    } else if (index < 0) {
      setActive(images.length - 1);
    } else {
      setActive(index);
    }
  };

  const handleButtonPrevClick = (index: number) => {
    showSlides((index - 1));
  };

  const handleButtonNextClick = (index: number) => {
    showSlides((index + 1));
  };

  const handleDotClick = (index: number) => {
    setActive(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.carousel}>
        {images.map((image, index) => (
          <div className={stylesContent(index)} key={image.id}>
            <img
              className={styles.image}
              src={image.src}
              alt={image.alt}
              width="100%"
            />
          </div>
        ))}
        <div>
          <div
            className={styles.cardPrev}
            role="button"
            tabIndex={0}
            onClick={(e) => { e.preventDefault(); handleButtonPrevClick(active); }}
            onKeyPress={(e) => { e.preventDefault(); handleButtonPrevClick(active); }}
          />
          <div
            className={styles.cardNext}
            role="button"
            tabIndex={0}
            onClick={(e) => { e.preventDefault(); handleButtonNextClick(active); }}
            onKeyPress={(e) => { e.preventDefault(); handleButtonNextClick(active); }}
          />
        </div>
      </div>
      <div className={styles.switch}>
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            aria-label="button-switch"
            className={stylesDot(Number(index))}
            onClick={(e) => { e.preventDefault(); handleDotClick(index); }}
            onKeyPress={(e) => { e.preventDefault(); handleDotClick(index); }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselImages;

import Image from 'next/image';
import { useState } from 'react';

import styles from './carouselImages.module.scss';

type CarouselImagesProps = {
  data: {
    images: Array<{ id: number, src: string }>,
    number: number,
  }
};

const CarouselImages = (props: CarouselImagesProps) => {
  const { data } = props;
  const { images, number } = data;

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
            <img className={styles.image} src={image.src} alt={`Room №${number}`} width="100%" />
          </div>
        ))}
        <div>
          <div className={styles.cardPrev} role="button" tabIndex={0} onClick={() => handleButtonPrevClick(active)} onKeyPress={() => handleButtonPrevClick(active)} />
          <div className={styles.cardNext} role="button" tabIndex={0} onClick={() => handleButtonNextClick(active)} onKeyPress={() => handleButtonNextClick(active)} />
        </div>
      </div>
      <div className={styles.switch}>
        {images.map((image, index) => (
          <label key={image.id}>
            <button
              type="button"
              aria-label="button-switch"
              className={stylesDot(Number(index))}
              onClick={() => handleDotClick(index)}
              onKeyPress={() => handleDotClick(index)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default CarouselImages;

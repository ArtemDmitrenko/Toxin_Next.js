import Image from 'next/image';

import styles from './socialIcons.module.scss';

type SocialButton = {
  id: number,
  name: string,
  href: string,
  src: string,
  width: number,
  height: number,
};

type SocialIconsProps = {
  buttons: Array<SocialButton> };

const SocialIcons = (props: SocialIconsProps) => {
  const { buttons } = props;

  return (
    <div className={styles.buttons}>
      {buttons.map(({
        id, name, href, src, width, height,
      }) => (
        <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer" key={id}>
          <Image alt={name} src={src} width={`${width}px`} height={`${height}px`} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;

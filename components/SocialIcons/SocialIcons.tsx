import Link from 'next/link';
import Image from 'next/image';

import styles from './SocialIcons.module.scss';

type SocialIconsProps = {
  buttons: Array<{
    id: number, name: string, href: string, src: string, width: number, height: number }> };

const SocialIcons = (props: SocialIconsProps) => {
  const { buttons } = props;

  return (
    <div className={styles.buttons}>
      {buttons.map(({
        id, name, href, src, width, height,
      }) => (
        <Link href={href} key={id}>
          <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
            <Image alt={name} src={src} width={`${width}px`} height={`${height}px`} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;

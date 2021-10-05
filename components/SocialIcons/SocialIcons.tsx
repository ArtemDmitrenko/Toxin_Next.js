import Link from 'next/link';
import Image from 'next/image';
import styles from 'components/SocialIcons/SocialIcons.module.scss';

type SocialIconsProps = {
  buttons: { name: string, href: string, src: string, width: number, height: number }[], };

export default function SocialIcons(props: SocialIconsProps) {
  const { buttons } = props;

  return (
    <div className={styles.buttons}>
      {buttons.map((item) => (
        <Link href={item.href} key={Math.random()}>
          <a className={styles.link} href={item.href}>
            <Image alt={item.name} src={item.src} width={`${item.width}px`} height={`${item.height}px`} />
          </a>
        </Link>
      ))}
    </div>
  );
}

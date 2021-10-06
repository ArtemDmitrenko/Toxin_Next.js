import Link from 'next/link';
import Image from 'next/image';

import logo from './img/logo.svg';

type LogoProps = {
  width: number,
  height: number,
  alt: string,
};

const Logo = ({ width, height, alt }: LogoProps) => (
  <div>
    <Link href="/" passHref>
      <a href="replace" tabIndex={0}>
        <Image
          src={logo}
          width={width}
          height={height}
          alt={alt}
          aria-label={alt}
        />
      </a>
    </Link>
  </div>
);

export default Logo;

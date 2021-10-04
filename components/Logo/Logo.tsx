import Link from 'next/link';
import Image from 'next/image';

import logo from './img/logo.svg';

type LogoProps = {
  width: number,
  height: number,
};

const Logo = (props: LogoProps) => {
  const { width, height } = props;

  return (
    <div>
      <Link href="/" passHref>
        <a href="replace">
          <Image
            src={logo}
            width={width}
            height={height}
            aria-label="Toxin logo"
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;

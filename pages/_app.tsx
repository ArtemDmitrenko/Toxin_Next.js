/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import type { AppProps } from 'next/app';

import { wrapper } from 'redux/store';
import 'style/style.scss';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);

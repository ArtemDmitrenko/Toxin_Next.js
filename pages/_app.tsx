/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import type { AppProps } from 'next/app';

import store from '../redux/store';
import '../style/style.scss';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default store.withRedux(WrappedApp);

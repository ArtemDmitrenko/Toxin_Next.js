/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';

import { wrapper } from 'Root/redux/store';
import 'Root/style/style.scss';
import { useAppDispatch } from 'Root/redux/hooks';
import { getUserStatus } from 'Root/redux/auth/authActions';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserStatus());
  }, []);

  return (
    <Component {...pageProps} />
  );
};

export default wrapper.withRedux(WrappedApp);

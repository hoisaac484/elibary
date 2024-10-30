import React from 'react';
import {CssBaseline} from '@mui/material';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
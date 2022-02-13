import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import {
	RecoilRoot,
	useRecoilValue
} from 'recoil';
import { themeState } from '../atoms';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>My new cool app</title>
			</Head>
			<ThemedApp>
				<Header />
				<Component {...pageProps} />
			</ThemedApp>
		</RecoilRoot>
	);
}

function ThemedApp({ children }: any) {
	const mode = useRecoilValue<'light' | 'dark'>(themeState); 
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	)
}

export default MyApp;

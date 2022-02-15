import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import {
	RecoilRoot,
	useRecoilValue
} from 'recoil';
import { themeState } from '../atoms';
import Header from '../components/Header';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => {
	return ({
		backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.grey['900']
	})
});

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
			<Container>
				{children}
			</Container>
		</ThemeProvider>
	)
}

export default MyApp;

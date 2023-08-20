import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
	return(<RecoilRoot>
		<Head>
			<title>Next.js + Tailwind CSS</title>
			<link rel='icon' href='/favicon.png' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

		</Head>
		<Component {...pageProps} />
	</RecoilRoot>)
}

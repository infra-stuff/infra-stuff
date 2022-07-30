import type { AppProps } from "next/app";

import AudioProvider from "@/components/AudioProvider";
import { Layout } from "@/components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AudioProvider>
			<Component {...pageProps} />
		</AudioProvider>
	);
}

export default MyApp;

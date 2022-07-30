import { FC } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import Container from "@/components/Container";
import { Layout } from "@/components/Layout";
import parseFeed from "@/components/parseFeed";
import EpisodeEntry from "./EpisodeEntry";
import { testFeed } from "../api/feed";

export interface Episode {
	id: string;
	title: string;
	published: number;
	description: string;
	audio: { src: string; type: string };
	content?: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	let feed = await parseFeed(testFeed);

	return {
		props: {
			episodes: feed.items.map(
				({ id, title, description, enclosures, published }): Episode => ({
					id,
					title: `E${id}: ${title}`,
					published,
					description,
					audio: enclosures.map((enclosure) => ({
						src: enclosure.url,
						type: enclosure.type,
					}))[0],
				})
			),
		},
		revalidate: 10,
	};
};

export default function Home({ episodes }: { episodes: Episode[] }) {
	console.log(episodes);
	return (
		<Layout>
			<Head>
				<title>
					Their Side - Conversations with the most tragically misunderstood people of our
					time
				</title>
				<meta
					name="description"
					content="Conversations with the most tragically misunderstood people of our time."
				/>
			</Head>
			<div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
				<Container>
					<h1 className="text-2xl font-bold leading-7 text-slate-900">Episodes</h1>
				</Container>
				<div className="divide-y divide-slate-200 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-200">
					{episodes.map((episode) => (
						<EpisodeEntry key={episode.id} episode={episode} />
					))}
				</div>
			</div>
		</Layout>
	);
}

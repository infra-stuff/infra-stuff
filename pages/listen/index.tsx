import { FC } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";

import { Layout } from "@/components/Layout";
import parseFeed from "@/components/parseFeed";
import { testFeed } from "../api/feed";
import Feed from "./Feed";

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

const Choice: FC<{ children: any; selected?: boolean }> = ({ children, selected = false }) => {
	const colors = selected
		? "border-indigo-600 text-indigo-600 bg-indigo-50"
		: "border-slate-300 text-slate-600";
	return (
		<button className={`py-1 px-2 border ${colors} rounded text-sm font-semibold`}>
			{children}
		</button>
	);
};

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Home({ episodes }: { episodes: Episode[] }) {
	return (
		<Layout>
			<Head>
				<title>Infrastructure Stuff - podcast about internet infrastructure</title>
				<meta
					name="description"
					content="A public Discord server and podcast focused on internet
					infrastructure—industry trends, academic research, startups, etc."
				/>
			</Head>
			<div className="flow-root relative pl-8 pr-12">
				<div className="z-30 sticky top-0 flex flex-row items-center space-x-4 bg-slate-50 mb-8 py-4 border-b border-slate-300">
					<div className="text-slate-500">Community</div>
					<span aria-hidden="true" className="font-bold text-slate-400">
						/
					</span>
					<Link
						// href={`/listen/${episode.id}`}
						href=""
						// aria-label={`Show notes for episode ${episode.title}`}
					>
						<a className="flex items-center font-bold text-slate-800 leading-6">Feed</a>
					</Link>
				</div>
				<Feed />
			</div>
		</Layout>
	);
}

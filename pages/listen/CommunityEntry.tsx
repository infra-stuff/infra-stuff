import React, { FC, useMemo } from "react";
import Link from "next/link";

import { useAudioPlayer } from "@/components/AudioProvider";
import Container from "@/components/Container";
import FormattedDate from "@/components/FormattedDate";
import { Episode } from ".";

export default function CommunityEntry() {
	let date = new Date();
	return (
		<article className="py-10 sm:py-12">
			<Container>
				<div className="flex flex-col items-start">
					<div className="flex flex-row items-center space-x-4">
						<h2 className="mt-2 text-lg font-bold text-slate-900">
							{/* <Link href={`/listen/${episode.id}`}>{episode.title}</Link> */}
							Community activity
						</h2>
						<FormattedDate
							date={date}
							className="font-mono text-sm leading-7 text-slate-500"
						/>
					</div>
					<p className="mt-1 text-base leading-7 text-slate-700">
						Hello, this is a summary of community events
					</p>
					<div className="mt-4 flex items-center gap-4">
						<button
							type="button"
							// onClick={() => player.toggle()}
							className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
							// aria-label={`${player.playing ? "Pause" : "Play"} episode ${
							// 	episode.title
							// }`}
						>
							<span className="ml-3" aria-hidden="true">
								Listen
							</span>
						</button>
						<span aria-hidden="true" className="text-sm font-bold text-slate-400">
							/
						</span>
						<Link
							href={``}
							className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
							// aria-label={`Show notes for episode ${episode.title}`}
						>
							Show notes
						</Link>
					</div>
				</div>
			</Container>
		</article>
	);
}

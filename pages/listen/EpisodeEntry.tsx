import React, { FC, useMemo } from "react";
import Link from "next/link";

import { useAudioPlayer } from "@/components/AudioProvider";
import Container from "@/components/Container";
import FormattedDate from "@/components/FormattedDate";
import { Episode } from ".";

const PlayPauseIcon: FC<{ playing: boolean } & React.SVGProps<SVGSVGElement>> = ({
	playing,
	...props
}) => {
	return (
		<svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
			{playing ? (
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
				/>
			) : (
				<path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
			)}
		</svg>
	);
};

export default function EpisodeEntry({ episode }: { episode?: Episode }) {
	let audioPlayerData = useMemo(
		() => ({
			title: episode?.title,
			audio: {
				src: episode?.audio.src,
				type: episode?.audio.type,
			},
			link: `/${episode?.id}`,
		}),
		[episode]
	);
	let player = useAudioPlayer(audioPlayerData);

	if (!episode) {
		return <div />;
	}

	let date = new Date(episode?.published);
	return (
		<article aria-labelledby={`episode-${episode.id}-title`} className="py-10 sm:py-12">
			<Container>
				<div className="flex flex-col items-start">
					<div className="flex flex-row items-center space-x-4">
						<h2
							id={`episode-${episode.id}-title`}
							className="mt-2 text-lg font-bold text-slate-900"
						>
							<Link href={`/listen/${episode.id}`}>{episode.title}</Link>
						</h2>
						<FormattedDate
							date={date}
							className="font-mono text-sm leading-7 text-slate-500"
						/>
					</div>
					<p className="mt-1 text-base leading-7 text-slate-700">{episode.description}</p>
					<div className="mt-4 flex items-center gap-4">
						<button
							type="button"
							onClick={() => player.toggle()}
							className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
							aria-label={`${player.playing ? "Pause" : "Play"} episode ${
								episode.title
							}`}
						>
							<PlayPauseIcon
								playing={player.playing}
								className="h-2.5 w-2.5 fill-current"
							/>
							<span className="ml-3" aria-hidden="true">
								Listen
							</span>
						</button>
						<span aria-hidden="true" className="text-sm font-bold text-slate-400">
							/
						</span>
						<Link
							href={`/listen/${episode.id}`}
							className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
							aria-label={`Show notes for episode ${episode.title}`}
						>
							Show notes
						</Link>
					</div>
				</div>
			</Container>
		</article>
	);
}

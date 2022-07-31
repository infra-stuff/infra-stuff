import { useState, Fragment, FC, SVGProps } from "react";
import Image from "next/future/image";
import Link from "next/link";
import clsx from "clsx";

import { AudioPlayer } from "@/components/player/AudioPlayer";
import SpotifyIcon from "./SpotifyIcon";
import OvercastIcon from "./OvercastIcon";
import ApplePodcastIcon from "./ApplePodcastIcon";
import RSSIcon from "./RSSIcon";
import PersonIcon from "./PersonIcon";
import AboutSection from "./AboutSection";

export const Layout: FC<{ children: any }> = ({ children }) => {
	return (
		<>
			{/* <div className="flex flex-row items-center border-b border-slate-200 px-4 h-12 bg-slate-50">
				<div>hi</div>
			</div> */}
			<header className="player bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-104">
				{/* <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
					<span className="font-mono text-slate-500">Hosted by</span>
					<span className="mt-6 flex gap-6 font-bold text-slate-900">
						{["Martin Casado", "Tim Chen", "Alex Clemmer"].map((host, hostIndex) => (
							<Fragment key={host}>
								{hostIndex !== 0 && (
									<span aria-hidden="true" className="text-slate-400">
										/
									</span>
								)}
								{host}
							</Fragment>
						))}
					</span>
				</div> */}
				<div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
					<Link href="/" aria-label="Homepage">
						<div className="flex flex-row">
							<div className="mx-auto lg:ml-0 border border-slate-300 rounded-2xl bg-white shadow-xl p-4">
								<Image
									className="m-auto"
									src="/podcast-album-cover.svg"
									width={288}
									height={288}
								/>
							</div>
						</div>
					</Link>
					<div className="mt-10 text-center lg:mt-12 lg:text-left">
						<p className="mt-3 text-lg font-normal leading-8 text-slate-700">
							A{" "}
							<Link href="https://discord.gg/JHc2ZrmaeD">
								<a target="_blank" rel="noreferrer">
									public Discord server
								</a>
							</Link>{" "}
							and <Link href="/listen">podcast</Link> focused on internet
							infrastructure—industry trends, academic research, startups,{" "}
							<em>etc</em>.
						</p>
					</div>
					<section className="text-center lg:text-left mt-10 lg:mt-12">
						{/* <div className="text-slate-800 font-black font-mono underline decoration-2 underline-offset-4 decoration-slate-400 decoration-dotted"> */}
						<div className="text-slate-800 font-black font-mono">Discord</div>
					</section>
					<div className="flex flex-row mt-2">
						<Link href="https://discord.gg/JHc2ZrmaeD">
							<a
								className="cursor-pointer mx-auto lg:ml-0 flex flex-row no-underline hover:no-underline space-x-2 items-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-base text-white hover:text-white px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-4 ring-indigo-300"
								target="_blank"
								rel="noreferrer"
							>
								<Image
									src="/discord-white.svg"
									alt="Join Discord Channel"
									width={24}
									height={24}
								/>{" "}
								<div>Join Channel</div>
							</a>
						</Link>
					</div>
					{/* <AboutSection className="mt-12 hidden lg:block flex flex-col space-y-4" /> */}
					<section className="mt-10 lg:mt-12">
						{/* <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
							<TinyWaveFormIcon
								colors={["fill-indigo-300", "fill-blue-300"]}
								className="h-2.5 w-2.5"
							/>
							<span className="ml-2.5">Listen</span>
						</h2> */}
						{/* <div className="text-slate-800 font-black font-mono underline decoration-2 underline-offset-4 decoration-slate-400 decoration-dotted"> */}
						<div className="hidden lg:flex text-slate-800 font-black font-mono">
							Listen
						</div>

						<div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
						<ul
							role="list"
							className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
						>
							{(
								[
									["Spotify", SpotifyIcon],
									["Apple Podcast", ApplePodcastIcon],
									["Overcast", OvercastIcon],
									["RSS Feed", RSSIcon],
								] as const
							).map(([label, Icon]) => (
								<li key={label} className="flex">
									<Link
										href="/"
										className="group flex items-center"
										aria-label={label}
									>
										<>
											<Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
											<span className="hidden sm:ml-3 sm:block">{label}</span>
										</>
									</Link>
								</li>
							))}
						</ul>
					</section>
				</div>
			</header>
			<main className="bg-white border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-104">
				{/* <Waveform className="absolute left-0 top-0 h-20 w-full" /> */}
				{/* <div className="z-10 top-0 sticky flex flex-row items-center space-x-4 border-b border-slate-200 pl-36 h-12 bg-slate-50">
					<span className="text-slate-500 font-extrabold font-mono">
						Infrastructure Stuff
					</span>
					<span aria-hidden="true" className="text-slate-400">
						/
					</span>
					<div>hi</div>
				</div> */}
				<div className="relative">{children}</div>
			</main>
			{/* <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
				<div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
					<AboutSection />
					<h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
						<PersonIcon className="h-3 w-auto fill-slate-300" />
						<span className="ml-2.5">Hosted by</span>
					</h2>
					<div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
						{hosts.map((host, hostIndex) => (
							<Fragment key={host}>
								{hostIndex !== 0 && (
									<span aria-hidden="true" className="text-slate-400">
										/
									</span>
								)}
								{host}
							</Fragment>
						))}
					</div>
				</div>
			</footer> */}
			<div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-104">
				<AudioPlayer />
			</div>
		</>
	);
};

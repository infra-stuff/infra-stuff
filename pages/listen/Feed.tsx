import Link from "next/link";
import Image from "next/image";
import {
	ChatAltIcon,
	ChatIcon,
	MicrophoneIcon,
	TagIcon,
	UserCircleIcon,
} from "@heroicons/react/solid";
import { FlagIcon, SpeakerphoneIcon } from "@heroicons/react/outline";

import FormattedDate from "@/components/FormattedDate";
import PlayPauseIcon from "./PlayPauseIcon";
import { FC, useState } from "react";

const activity = [
	{
		id: 2,
		type: "community-activity",
		person: { name: "Eduardo Benz", href: "#" },
		title: "A second chance to question our own wisdom.",
		podcastId: 1,
		description:
			"Evidently we did not learn from the last disaster. Now we are going to inflict this on all of you a second time.",
		imageUrl:
			"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
		date: new Date(),
	},
	{
		id: 1,
		type: "podcast-episode",
		person: { name: "Eduardo Benz", href: "#" },
		title: "A second chance to question our own wisdom.",
		podcastId: 1,
		description:
			"Evidently we did not learn from the last disaster. Now we are going to inflict this on all of you a second time.",
		imageUrl:
			"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
		date: new Date(),
	},
	{
		id: 0,
		type: "podcast-episode",
		person: { name: "Eduardo Benz", href: "#" },
		title: "Why Infrastructure Stuff?",
		podcastId: 0,
		description:
			"We started yet another computers-and-startups podcast. What good reasons could we possibly have for doing this? Sometimes we wonder that too, but here is our rationale.",
		imageUrl:
			"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
		date: new Date(),
	},
	// {
	// 	id: 1,
	// 	type: "comment",
	// 	person: { name: "Eduardo Benz", href: "#" },
	// 	imageUrl:
	// 		"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
	// 	comment:
	// 		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
	// 	date: "6d ago",
	// },
	// {
	// 	id: 2,
	// 	type: "assignment",
	// 	person: { name: "Hilary Mahy", href: "#" },
	// 	assigned: { name: "Kristin Watson", href: "#" },
	// 	date: "2d ago",
	// },
	// {
	// 	id: 3,
	// 	type: "tags",
	// 	person: { name: "Hilary Mahy", href: "#" },
	// 	tags: [
	// 		{ name: "Bug", href: "#", color: "bg-rose-500" },
	// 		{ name: "Accessibility", href: "#", color: "bg-indigo-500" },
	// 	],
	// 	date: "6h ago",
	// },
	// {
	// 	id: 4,
	// 	type: "comment",
	// 	person: { name: "Jason Meyers", href: "#" },
	// 	imageUrl:
	// 		"https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
	// 	comment:
	// 		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
	// 	date: "2h ago",
	// },
] as const;

const Choice: FC<{
	position: "left" | "center" | "right";
	selected: boolean;
	onClick: () => void;
	children: any;
}> = ({ position, selected, onClick, children }) => {
	const rounded = position === "left" ? "rounded-l" : position === "center" ? "" : "rounded-r";
	const border = selected ? "border-indigo-800" : "border-indigo-200 hover:border-indigo-300";
	const bg = selected ? "bg-indigo-100" : "bg-indigo-50 hover:bg-indigo-100 focus:bg-indigo-50";
	const text = selected ? "text-indigo-600" : "text-indigo-400";
	const m = position === "left" ? "" : "-ml-px";
	const z = selected ? "z-20 focus:z-20" : "focus:z-20 hover:z-10";
	return (
		<button
			className={`cursor-pointer ${z} flex flex-row space-x-2 no-underline hover:no-underline items-center border ${border} ${bg} ${text} hover:text-indigo-800 active:text-black text-sm ${m} px-2 py-0.5 ${rounded} font-semibold focus:outline-none focus:ring-4 ring-indigo-300`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const FeedFilters: FC<{
	value: "all" | "discord" | "podcast";
	onClick: (selected: "all" | "discord" | "podcast") => void;
}> = ({ value, onClick }) => {
	return (
		<div className="flex flex-row">
			<Choice position="left" selected={value === "all"} onClick={() => onClick("all")}>
				All
			</Choice>
			<Choice
				position="center"
				selected={value === "discord"}
				onClick={() => onClick("discord")}
			>
				<ChatIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Discord Activity
			</Choice>
			<Choice
				position="right"
				selected={value === "podcast"}
				onClick={() => onClick("podcast")}
			>
				<MicrophoneIcon className="h-4 w-4 mr-2" aria-hidden="true" /> New Podcast
			</Choice>
		</div>
	);
};

export default function Feed() {
	const [filterState, setFilterState] = useState<"all" | "discord" | "podcast">("all");

	const feedItems =
		filterState === "all"
			? activity
			: filterState === "discord"
			? activity.filter((e) => e.type === "community-activity")
			: activity.filter((e) => e.type === "podcast-episode");

	return (
		<div className="flex flex-col space-y-8">
			<div className="flex flex-row items-center space-x-4">
				<div className="text-slate-500 text-sm">Filter events:</div>
				<FeedFilters value={filterState} onClick={setFilterState} />
			</div>
			<ul role="list">
				{feedItems.map((activityItem, activityItemIdx) => (
					<li key={activityItem.id}>
						<div className="relative pb-12">
							{activityItemIdx !== feedItems.length - 1 ? (
								<span
									className="absolute top-6 left-6 -ml-px h-full w-0.5 bg-gray-200"
									aria-hidden="true"
								/>
							) : null}
							<div className="relative flex items-start space-x-3">
								{activityItem.type === "podcast-episode" ? (
									<>
										<div className="relative px-1 ring-8 ring-slate-50 ">
											<div className="h-10 w-10 bg-yellow-400 rounded-lg flex items-center justify-center">
												<MicrophoneIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</div>
										</div>
										{/* <div className="min-w-0 max-w-2xl -mt-2 flex-1 bg-white px-6 py-4 border rounded-md shadow-lg"> */}
										<div className="min-w-0 mt-1 max-w-2xl flex-1">
											<div className="min-w-0 flex-1 py-1 pb-4">
												<div className="text-gray-500 text-sm">
													New podcast episode ·{" "}
													<FormattedDate date={activityItem.date} />
												</div>
											</div>{" "}
											<div>
												<div className="text-lg">
													<a
														href={activityItem.person.href}
														className="text-xl no-underline font-bold text-slate-800"
													>
														EP {activityItem.podcastId}:{" "}
														{activityItem.title}
													</a>
												</div>
											</div>
											<div className="mt-2 text-gray-700">
												<p>{activityItem.description}</p>
											</div>
											<div className="flex flex-row items-center space-x-4 mt-4">
												<button
													type="button"
													// onClick={() => player.toggle()}
													className="cursor-pointer flex flex-row space-x-2 no-underline hover:no-underline items-center border border-transparent focus:border-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:bg-indigo-50 active:bg-indigo-200 text-indigo-600 hover:text-indigo-800 active:text-black text-sm px-2 py-0.5 rounded font-semibold focus:outline-none focus:ring-4 ring-indigo-300"
													// aria-label={`${
													// 	player.playing ? "Pause" : "Play"
													// } episode ${episode.title}`}
												>
													<PlayPauseIcon
														// playing={player.playing}
														playing={false}
														className="h-2.5 w-2.5 fill-current"
													/>
													<span className="ml-3" aria-hidden="true">
														Listen
													</span>
												</button>
												<span
													aria-hidden="true"
													className="text-sm font-bold text-slate-400"
												>
													/
												</span>
												<Link
													// href={`/listen/${episode.id}`}
													href=""
													// aria-label={`Show notes for episode ${episode.title}`}
												>
													<a className="flex items-center text-sm font-bold leading-6">
														Show notes
													</a>
												</Link>
											</div>
										</div>
									</>
								) : activityItem.type === "community-activity" ? (
									<>
										<div className="relative px-1 ring-8 ring-slate-50 ">
											<div className="h-10 w-10 bg-rose-400 rounded-full flex items-center justify-center">
												<ChatIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</div>
										</div>
										<div className="min-w-0 mt-1 max-w-2xl flex-1">
											<div className="min-w-0 flex-1 py-1">
												<div className="text-gray-500 text-sm">
													Activity 🎉 in the <a>Discord community</a>
												</div>
											</div>{" "}
											<div className="mt-2 text-gray-700">
												3,473 <a>messages</a> since in the last 10 days.
												Popular messages have tags like{" "}
												<a className=" whitespace-nowrap cursor-pointer text-indigo-600 hover:text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-1.5 py-0.5 text-sm font-medium rounded no-underline hover:no-underline">
													#infra-junk-drawer
												</a>
												,{" "}
												<a className="cursor-pointer text-indigo-600 hover:text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-1.5 py-0.5 text-sm font-medium rounded no-underline hover:no-underline">
													#cool-stuff
												</a>
												, and{" "}
												<a className="cursor-pointer text-indigo-600 hover:text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-1.5 py-0.5 text-sm font-medium rounded no-underline hover:no-underline">
													#alex-hates-it
												</a>
												.
											</div>
											<div className="flex flex-row items-center space-x-4 mt-4">
												<Link href="https://discord.gg/JHc2ZrmaeD">
													<a
														className="cursor-pointer flex flex-row no-underline hover:no-underline space-x-2 items-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-sm text-white hover:text-white px-2 py-1 rounded font-semibold focus:outline-none focus:ring-4 ring-indigo-300"
														target="_blank"
														rel="noreferrer"
													>
														<Image
															src="/discord-white.svg"
															alt="Join Discord Channel"
															width={16}
															height={16}
														/>{" "}
														<div>Join Channel</div>
													</a>
												</Link>
											</div>
										</div>
									</>
								) : null}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

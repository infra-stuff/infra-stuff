import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function AboutSection(
	props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
	let [isExpanded, setIsExpanded] = useState(false);

	return (
		<section {...props}>
			{/* <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
				<TinyWaveFormIcon
					colors={["fill-violet-300", "fill-pink-300"]}
					className="h-2.5 w-2.5"
				/>
				<span className="ml-2.5">About</span>
			</h2> */}

			<p
				className={clsx(
					"mt-2 text-base leading-7 text-slate-700",
					!isExpanded && "lg:line-clamp-4"
				)}
			>
				Infra stuff is a{" "}
				<Link href="https://discord.gg/JHc2ZrmaeD" target="_blank" rel="noreferrer">
					public Discord server
				</Link>{" "}
				and <Link href="/listen">podcast</Link> focused on internet infrastructure—industry
				trends, academic research, startups, <em>etc</em>.
			</p>
			{/* <p>
				Infra stuff is hosted by{" "}
				<a href="https://twitter.com/martin_casado" target="_blank" rel="noreferrer">
					Martin Casado
				</a>
				,{" "}
				<a href="https://twitter.com/tnachen" target="_blank" rel="noreferrer">
					Tim Chen
				</a>
				, and{" "}
				<a href="https://twitter.com/hausdorff_space" target="_blank" rel="noreferrer">
					Alex Clemmer
				</a>
			</p> */}
			{/* {!isExpanded && (
				<button
					type="button"
					className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
					onClick={() => setIsExpanded(true)}
				>
					Show more
				</button>
			)} */}
		</section>
	);
}

import { FC } from "react";
import clsx from "clsx";

export default function Container({
	className,
	children,
	...props
}: {
	className?: string;
	children?: any;
}) {
	return (
		<div className={clsx("lg:px-8", className)} {...props}>
			<div className="lg:max-w-4xl">
				<div className="px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">{children}</div>
			</div>
		</div>
	);
}

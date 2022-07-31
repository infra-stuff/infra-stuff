import { FC } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

export default function FormattedDate({ date, ...props }: { className?: string; date: Date }) {
	return (
		<time dateTime={date.toISOString()} {...props}>
			{dateFormatter.format(date)}
		</time>
	);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
	res.setHeader("Content-Type", "application/xml");
	res.write(feed);
	res.status(200);
	res.end();
}

const feed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>Infrastructure Stuff</title>
        <link>undefined</link>
        <description>A public Discord server and podcast focused on internet infrastructure—industry trends, academic research, startups, etc.</description>
        <lastBuildDate>Fri, 29 Jul 2022 22:21:17 GMT</lastBuildDate>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        <generator>https://github.com/jpmonette/feed</generator>
        <language>en</language>
        <item>
            <title><![CDATA[A second chance to question our own wisdom.]]></title>
            <guid>1</guid>
            <id>1</id>
            <pubDate>Fri, 29 Jul 2022 00:00:00 GMT</pubDate>
            <description><![CDATA[Evidently we did not learn from the last disaster. Now we are going to inflict this on all of you a second time.]]></description>
            <content:encoded><![CDATA[<h2 id="topics">Topics</h2>
<ul>
<li>The rambling begins. It continues unabated for more than an hour.</li>
<li>It eventually touches every topic known to computers people.</li>
<li>Because we think we are smarter than we are, we regularly make a bunch of assumptions that would probably fly at a cocktail party but which are obviously untrue to anyone who has spent more than literally 30 seconds thinking about it. Luckily for us, we feel extremely good about ourselves.</li>
<li>Finally it ends.</li>
</ul>
<h2 id="links">Links</h2>
<ul>
<li>We talked about a lot of stuff so there would be a lot of links if we actually edited before putting it out there. <a href="#">Here is a random link instead.</a></li>
</ul>
]]></content:encoded>
            <enclosure length="0" type="audio/mpeg" url="https://their-side-feed.vercel.app/episode-005.mp3"/>
        </item>
        <item>
            <title><![CDATA[Why Infrastructure Stuff?]]></title>
            <guid>0</guid>
            <id>0</id>
            <pubDate>Fri, 29 Jul 2022 00:00:00 GMT</pubDate>
            <description><![CDATA[We started yet another computers-and-startups podcast. What good reasons could we possibly have for doing this? Sometimes we wonder that too, but here is our rationale.]]></description>
            <content:encoded><![CDATA[<h2 id="topics">Topics</h2>
<ul>
<li>The rambling begins. It continues unabated for more than an hour.</li>
<li>It eventually touches every topic known to computers people.</li>
<li>Because we think we are smarter than we are, we regularly make a bunch of assumptions that would probably fly at a cocktail party but which are obviously untrue to anyone who has spent more than literally 30 seconds thinking about it. Luckily for us, we feel extremely good about ourselves.</li>
<li>Finally it ends.</li>
</ul>
<h2 id="links">Links</h2>
<ul>
<li>We talked about a lot of stuff so there would be a lot of links if we actually edited before putting it out there. <a href="#">Here is a random link instead.</a></li>
</ul>
]]></content:encoded>
            <enclosure length="0" type="audio/mpeg" url="https://their-side-feed.vercel.app/episode-005.mp3"/>
        </item>
    </channel>
</rss>`;

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('dump').setDescription('Dump all messages from a channel to stdout').addStringOption(option =>
		option.setName('channelid')
			.setDescription('The channel to dump')
			.setRequired(true)).addStringOption(option =>
				option.setName('messageid')
			          .setDescription('will dump all messages after his one')
					  .setRequired(false)),
	new SlashCommandBuilder().setName('cvxwrite').setDescription('write a string to convex table').addStringOption(option =>
		option.setName('str')
			.setDescription('The string to write')
			.setRequired(true)),
	new SlashCommandBuilder().setName('syncchannels').setDescription('sync all channel names and IDs to convex'),
	new SlashCommandBuilder().setName('dark').setDescription('set avatar to dark rajko'),
	new SlashCommandBuilder().setName('miami').setDescription('set avatar to miami rajko'),
   ]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

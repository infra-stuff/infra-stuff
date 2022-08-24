const { Client, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });


// used for testing without Discord interaction
// client.once('ready', () => {
// 	console.log('Ready!');
// 
//     fetchAllMessages();
// });


// Asyncronous function to get all of the messages from a channel given the ID
// And dump to stdout. You can get the channelid from discord by ctl+clicking
// on the channel name and selecting "Copy ID"
//
// The harcoded ID is for "playing with infra" channel on YAIG. 
//
async function fetchAllMessages(channelid) {
  // let channelid = '1002809189875322910';
  const channel = client.channels.cache.get(channelid);
  let messages = [];

  // Create message pointer
  let message = await channel.messages
    .fetch({ limit: 1 })
    .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

  let first_str = message.id + " : " + message.author.username+" : " + message.content;

  console.log("getting all messages from channelid "+channelid+" this may take awhile");

  while (message) {
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then(messagePage => {
        messagePage.forEach(msg => messages.push(msg));

        // Update our message pointer to be last message in page of messages
        message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
      })
      process.stdout.write('.');
  }
  console.log('');
  console.log(first_str);
  messages.forEach(message => console.log(message.id + " : " + message.author.username+" : " + message.content))
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'dump') {
    const chid = interaction.options.getString('channelid');
    fetchAllMessages(chid);
		await interaction.reply("Dumping messages for channelid "+ chid);
	} 
});

// Login to Discord with your client's token
client.login(token);
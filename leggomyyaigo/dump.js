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
// If a messageid is passed in, it will read from the server until it receives a messageid that is no
// longer greater than the passed in message id
//
// The harcoded ID is for "playing with infra" channel on YAIG. 
//
async function fetchAllMessages(channelid, messageid) {
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
    var found_limit = false;
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then(messagePage => {

        for (var i = 0; i < messagePage.size; ++i) {
          const msg = messagePage.at(i);
          if ((messageid != null) && (parseInt(msg.id) <= parseInt(messageid))) {
            found_limit = true;
            break;
          }
          messages.push(msg);
        }

        // Update our message pointer to be last message in page of messages
        message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
      })
      if(found_limit == true){
        break;
      }
      process.stdout.write('.');
  }
  console.log('');

  console.log(first_str);

  for (const message of messages){
    console.log(message.id + " : " + message.author.username+" : " + message.content);
  }
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'dump') {
    const chid  = interaction.options.getString('channelid');
    const msgid = interaction.options.getString('messageid');
    console.log("Recieved /dump command. channelid "+chid+" msgid "+msgid)
    fetchAllMessages(chid, msgid);
		await interaction.reply("Dumping messages for channelid "+ chid);
	} 
});


console.log("Logging in "+clientId+ " : "+guildId)
// Login to Discord with your client's token
client.login(token);
console.log("Logged in, use /dump from Discord to dump channel");

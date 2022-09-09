const { Client, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const { InternalConvexClient, ConvexHttpClient } = require("convex/browser");

const {prodUrl} = require("./convex.json"); 
const config = {address : prodUrl};
const convexhttp = new ConvexHttpClient(config);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// CONVEX global initialization
console.log("Created new convex http client to origin "+config);

const CHUNK = 100;

async function sendMessage(channelid, messages) {

  console.log("Sending a total of "+messages.length+" messages");

  let sendlist = [];

  for (const message of messages) {
    sendlist.push([channelid, message.id, message.content, message.author.username]);
    if (sendlist.length > 100) {
      console.log("Sending message list to Convex of size " + sendlist.length)
      const res = convexhttp.mutation("sendMessage")(sendlist);
      await res.then(msg_add_success, msg_add_failure);
      sendlist = [];
    };
  }
   console.log("Sending message list to Convex of size " + sendlist.length)
   const res = convexhttp.mutation("sendMessage")(sendlist);
   await res.then(msg_add_success, msg_add_failure);
}

function msg_add_success () {
}

function msg_add_failure () {
    console.log("Failed to add message");
}

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


  messages.push(message);

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

  sendMessage(channelid, messages);


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

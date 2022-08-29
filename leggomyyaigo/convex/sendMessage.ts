import { mutation } from "./_generated/server";

// Send a chat message.
export default mutation(({ db }, channelid: string, msgid: string, body: string, username: string) => {
  const message = { channelid, msgid, body, username };
  db.insert("messages", message);
});

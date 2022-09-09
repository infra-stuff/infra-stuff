import { mutation } from "./_generated/server";

// Send a chat message.
//export default mutation(async ({ db }, msglist) => {
export default mutation(async({ db }, msglist) => {
  console.log("Pushing msglist of size "+msglist.length);

  let count = 0;
  for (var i = 0; i < msglist.length; ++i) {
    let chid  = msglist[i][0];
    let msgid = msglist[i][1];
    let body  = msglist[i][2];
    let author = msglist[i][3];


    // check if this message already exists
    const checkmsg = await db.table("messages")
                              .index("by_msgid")
                              .range(q => q.eq("msgid", msgid))
                              .first();

    if (checkmsg === null) {
      const message = { chid, msgid, body, author };
      db.insert("messages", message);
      count++;
    }
  }
  console.log("Done. Sync'd "+count+" messages");
});

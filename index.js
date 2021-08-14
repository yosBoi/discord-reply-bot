const {Client, Intents} = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES]});

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

client.once("ready", () => {
    console.log("connected");
})

//generic replies for everyone
let replies = ["sample", "sample2"]

//user-specific replies
let userSpecificReplies = [
    {"id": "", "replies": []},
    {"id": "", "replies": []}
]

//role ID of members who get specific replies
let roleId = ''

let specificReplyLocate = userId => {
    let i;
    for(i=0; i<userSpecificReplies.length; i++){
        if(userSpecificReplies[i].id == userId){
            break;
        }
    }
    if(i == userSpecificReplies.length){
        //if user not found in that array
        return replies;
    }
    else{
        return userSpecificReplies[i].replies;
    }
}


client.on("messageCreate", (message) => {

    //if bot tagged
    if(message.mentions.has(client.user)){

        //if author of message has specified role
        if(message.member.roles.cache.has(roleId)){
            //50% chance for user-specific reply
            if(Math.random() < 0.5){
                let specificReplies = specificReplyLocate(message.author.id);
                message.reply(specificReplies[Math.floor(Math.random() * (specificReplies.length))])
            } 
        }
        //else generic reply
        else{
            message.reply(replies[Math.floor(Math.random() * (replies.length))]);
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)


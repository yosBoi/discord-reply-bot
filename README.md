# discord-reply-bot

Simple discord bot that replies whenever a user tags the bot.
Reply strings can be added to the 'replies' array. A random reply will be chosen from the array.

Furthermore, custom replies can be added for specific users. Users marked for custom replies must have a specific role which can be defined by `roleId`

Each user's ID and their replies must be added in `specificReplies` array.
Upon receiving a tag from a user with role, there is a 50% chance (can be changed) that the user will receive a custom reply, and a 50% chance user will receive a generic reply.
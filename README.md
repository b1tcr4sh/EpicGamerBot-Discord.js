# Certified Epic Gamer Discord Bot

This bot is written in javscript using Node.js and the Discord.js module.  I'm working on this primarily as a project to help me learn javscript, but it also serves some use to our Discord server, even if that is mostly just for screwing with each other.

If you want to see my current progress on the bot, feel free to check out my [Trello List](https://trello.com/b/Z3G2p1Gt).  It's coming, even if slowly.

## Documentation
Currently, the bot has a few commands with significant functions which are available to non-admin users.  These can be listed by using the 'help' command. 
#### Command Syntax: `?[command] [argument]`

#### Help Command
Displays all command aliases and descriptions.

- Sytax: `?help [paramater(optional)]`

- Arguments: 
  - `[empty]`: Displays all commands available to members.
  - 'admin': Displays all commands available to admins.  (Requires admin permissions to execute)
  - `[Any Valid Command]`: Displays specific information about the command entered.
  
## Self Usage
Although this bot is currently only deployed to run in our server, you can download this project, modify, and use it as you would like, as long as you comply with the [Apache 2.0 license](https://github.com/TheArcticHusky/EpicGamerBot-Discord.js/blob/master/LICENSE)

The bots runs in a node.js environment, with a local MongoDB database and  a few dependencies.  If you would like to run this bot for yourself, you would need to download the source code, setup the environment (with node.js and mongodb), install the dependencies, and setup the bot with Discord's developer api.

#### Dependencies
- [Discord.js](https://www.npmjs.com/package/discord.js)
- [minecraft-server-util](https://www.npmjs.com/package/minecraft-server-util)
- [Mongoose](https://www.npmjs.com/package/mongoose)

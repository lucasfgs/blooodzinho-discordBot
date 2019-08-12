const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const lolApi = require("./leagueOfLegends/api.js");
require("dotenv").config();

//Send methods
// SERVER
const sendServerInfo = require("./server/actions/sendServerInfo");
const sendBotInfo = require("./server/actions/sendBotInfo");

// LOL
const sendSummonerInfo = require("./leagueOfLegends/actions/sendSummonerInfo");
const sendSummonerRank = require("./leagueOfLegends/actions/sendSummonerRank");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("seu cu!", { type: "WATCHING" });
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}lol`) {
    let username = args.join(" ");
    await sendSummonerInfo(username, message);
  }

  if (cmd === `${prefix}rank`) {
    let username = args.join(" ");
    sendSummonerRank(username, message);
  }

  if (cmd === `${prefix}serverinfo`) {
    sendServerInfo(message);
  }

  if (cmd === `${prefix}botinfo`) {
    sendBotInfo(message, bot);
  }
});

bot.login(process.env.BOT_API_KEY);

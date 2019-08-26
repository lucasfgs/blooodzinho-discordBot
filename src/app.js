const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
require("dotenv").config();

//Send methods
// SERVER
const sendServerInfo = require("./server/actions/sendServerInfo");
const sendBotInfo = require("./server/actions/sendBotInfo");
const sendHelp = require("./server/actions/sendHelp");

// LOL
const sendSummonerInfo = require("./leagueOfLegends/actions/sendSummonerInfo");
const sendSummonerRank = require("./leagueOfLegends/actions/sendSummonerRank");
const sendTopPlayers = require("./leagueOfLegends/actions/sendTopPlayers");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("!help", { type: "PLAYING" });
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let { prefix } = botconfig.config;
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

  if (cmd === `${prefix}top`) {
    let tier = args[0];
    let division = args[1];
    await sendTopPlayers(message, tier, division);
  }

  if (cmd === `${prefix}serverinfo`) {
    sendServerInfo(message);
  }

  if (cmd === `${prefix}botinfo`) {
    sendBotInfo(message, bot);
  }
  if (cmd === `${prefix}help`) {
    sendHelp(message);
  }
});

bot.login(process.env.BOT_API_KEY);

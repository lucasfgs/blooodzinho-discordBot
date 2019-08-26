const Discord = require("discord.js");
const config = require("../../../botconfig.json");

const sendHelp = message => {
  let { commands } = config;
  let botembed = new Discord.RichEmbed().setDescription(
    `**COMMANDS**\n\n **!help**: ${
      commands.help
    } \n\n **!lol** *[Nome do invocador]*: ${
      commands.lol
    } \n\n **!rank** *[Nome do invocador]*: ${
      commands.rank
    } \n\n **!top** *[Elo (Não obrigatório)]*: ${
      commands.top
    } \n\n **!serverinfo**: ${commands.serverinfo} \n\n **!botinfo**: ${
      commands.botinfo
    } `
  );

  console.log(typeof commands);

  return message.channel.send(botembed);
};

module.exports = sendHelp;

const Discord = require("discord.js");

const lolApi = require("../api");

const sendSummonerInfo = async (username, message) => {
  let summonerInfo = await lolApi.getSummonerInfo(username);
  if (summonerInfo) {
    let lolembed = new Discord.RichEmbed()
      .setDescription("Estatísticas League of Legends")
      .setColor("#8e44ad")
      .addField("Nome:", summonerInfo.name)
      .addField("Level:", summonerInfo.summonerLevel, true);
    message.channel.send(lolembed);
  } else {
    message.channel.send("O invocador não existe!");
  }
};

module.exports = sendSummonerInfo;

const Discord = require("discord.js");

const { getSummonerRank } = require("../api");
const getTierImage = require("../utils/getTierImage");

const sendSummonerRank = async (username, message) => {
  let summonerRank = await getSummonerRank(username);
  if (summonerRank) {
    let wins = summonerRank[0].wins;
    let losses = summonerRank[0].losses;
    let total = wins + losses;
    let winrate = parseInt((wins / total) * 100);
    let tier = summonerRank[0].tier;

    let lolembed = new Discord.RichEmbed()
      .setDescription("Estatísticas League of Legends")
      .setColor("#8e44ad")
      .addField("Nome:", summonerRank[0].summonerName)
      .addField(
        "Elo:",
        `${tier} ${summonerRank[0].rank} - ${
          summonerRank[0].leaguePoints
        } Pontos`,
        true
      )
      .addField("Win Rate:", `${winrate}%`);
    lolembed.setThumbnail(getTierImage(tier));

    message.channel.send(lolembed);
  } else {
    message.channel.send("O invocador não possui um elo ou não existe!");
  }
};

module.exports = sendSummonerRank;

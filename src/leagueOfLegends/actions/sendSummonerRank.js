const Discord = require("discord.js");

const { getSummonerRank } = require("../api");
const getTierImage = require("../utils/getTierImage");

const sendSummonerRank = async (username, message) => {
  let summonerRank = await getSummonerRank(username);
  if (!summonerRank) {
    message.channel.send("O invocador não possui um elo ou não existe!");
  }
  summonerRank.map(summoner => {
    if (summoner.queueType === "RANKED_SOLO_5x5") {
      let wins = summoner.wins;
      let losses = summoner.losses;
      let total = wins + losses;
      let winrate = parseInt((wins / total) * 100);
      let tier = summoner.tier;

      let lolembed = new Discord.RichEmbed()
        .setDescription("Estatísticas League of Legends")
        .setColor("#8e44ad")
        .addField("Nome:", summoner.summonerName)
        .addField(
          "Elo:",
          `${tier} ${summoner.rank} - ${summoner.leaguePoints} Pontos`,
          true
        )
        .addField("Win Rate:", `${winrate}%`);
      lolembed.setThumbnail(getTierImage(tier));

      message.channel.send(lolembed);
    }
  });
};

module.exports = sendSummonerRank;

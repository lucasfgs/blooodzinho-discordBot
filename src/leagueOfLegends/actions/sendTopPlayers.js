const Discord = require("discord.js");

const { getTopPlayers } = require("../api");
const getTierImage = require("../utils/getTierImage");

const sendTopPlayers = async (message, tier = "CHALLENGER", division = "I") => {
  let upperCaseTier = "";
  if (tier) {
    upperCaseTier = tier.toUpperCase();
  }
  const players = await getTopPlayers(upperCaseTier, division);

  if (players) {
    let playerEmbed = new Discord.RichEmbed()
      .setDescription("Top 10 players")
      .setColor("#f39c12")
      .setThumbnail(getTierImage(upperCaseTier));

    console.log(players);
    players.map(player => {
      let wins = player.wins;
      let losses = player.losses;
      let total = wins + losses;
      let winrate = parseInt((wins / total) * 100);
      playerEmbed.addField(
        `${player.summonerName}`,
        `${player.tier} - ${player.leaguePoints} Pontos | Winrate: ${winrate}%`
      );
    });
    message.channel.send(playerEmbed);
  } else {
    message.channel.send("Erro ao encontrar jogadores!");
  }
};

module.exports = sendTopPlayers;

const Discord = require("discord.js");

const lolApi = require("../api");

const sendSummonerRank = async (username, message) => {
  let summonerRank = await lolApi.getSummonerRank(username);
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

    if (tier === "IRON")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Iron_Emblem-150x150.png"
      );
    else if (tier === "BRONZE")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Bronze_Emblem-150x150.png"
      );
    else if (tier === "SILVER")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Silver_Emblem-150x150.png"
      );
    else if (tier === "GOLD")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Gold_Emblem-150x150.png"
      );
    else if (tier === "PLATINUM")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Platinum_Emblem-150x150.png"
      );
    else if (tier === "DIAMOND")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Diamond_Emblem-150x150.png"
      );
    else if (tier === "MASTER")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Master_Emblem-150x150.png"
      );
    else if (tier === "GRANDMASTER")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Grandmaster_Emblem-150x150.png"
      );
    else if (tier === "CHALLENGER")
      lolembed.setThumbnail(
        "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Challenger_Emblem-150x150.png"
      );

    message.channel.send(lolembed);
  } else {
    message.channel.send("O invocador não possui um elo ou não existe!");
  }
};

module.exports = sendSummonerRank;

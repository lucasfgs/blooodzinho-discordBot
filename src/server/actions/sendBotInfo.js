const Discord = require("discord.js");

const sendBotInfo = (message, bot) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setDescription("BOT INFORMATION!")
    .setColor("#8e44ad")
    .setThumbnail(bicon)
    .addField("Bot Name:", bot.user.username)
    .addField("Created on:", bot.user.createdAt);

  return message.channel.send(botembed);
};

module.exports = sendBotInfo;

const Discord = require("discord.js");

const sendServerInfo = message => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
    .setDescription("SERVER INFORMATION!")
    .setColor("#8e44ad")
    .setThumbnail(sicon)
    .addField("Server name:", message.guild.name)
    .addField("Created on:", message.guild.createdAt)
    .addField("You Joined:", message.member.joinedAt)
    .addField("Total Members:", message.guild.memberCount);

  message.channel.send(serverembed);
};

module.exports = sendServerInfo;

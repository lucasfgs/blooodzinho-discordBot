const botconfig = require('./botconfig.json')
const Discord = require('discord.js')
const bot = new Discord.Client({ disableEveryone: true })
const glb = require('./global.js')
const https = require('https')
const API_KEY = "RGAPI-29d66403-100f-4289-a13a-72e761aa99db";
const lolApi = require('./API_Request.js')

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("a mãe do Caio gemer!", { type: "LISTENING" })
})

bot.on("message", async (message) => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return

    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if (cmd === `${prefix}lol`) {
        let username = args.join(" ")

        lolApi.getSummonerInfo(username, (value) => {
            let lolembed = new Discord.RichEmbed()
                .setDescription("Estatísticas League of Legends")
                .setColor("#8e44ad")
                .addField("Nome:", value.name)
                .addField("Level:", value.summonerLevel, true)
            message.channel.send(lolembed)
        })
    }

    if (cmd === `${prefix}rank`) {
        let username = args.join(" ")

        lolApi.getSummonerRank(username, (value) => {
            try {
                let wins = value[0].wins
                let losses = value[0].losses
                let total = wins + losses
                let winrate = parseInt((wins / total) * 100)
                let tier = value[0].tier


                let lolembed = new Discord.RichEmbed()
                    .setDescription("Estatísticas League of Legends")
                    .setColor("#8e44ad")
                    .addField("Nome:", value[0].summonerName)
                    .addField("Elo:", `${tier} ${value[0].rank} - ${value[0].leaguePoints} Pontos`, true)
                    .addField("Win Rate:", `${winrate}%`)

                if (tier === 'IRON') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Iron_Emblem-150x150.png")
                else if (tier === 'BRONZE') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Bronze_Emblem-150x150.png")
                else if (tier === 'SILVER') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Silver_Emblem-150x150.png")
                else if (tier === 'GOLD') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Gold_Emblem-150x150.png")
                else if (tier === 'PLATINUM') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Platinum_Emblem-150x150.png")
                else if (tier === 'DIAMOND') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Diamond_Emblem-150x150.png")
                else if (tier === 'MASTER') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Master_Emblem-150x150.png")
                else if (tier === 'GRANDMASTER') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Grandmaster_Emblem-150x150.png")
                else if (tier === 'CHALLENGER') lolembed.setThumbnail("https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Challenger_Emblem-150x150.png")

                message.channel.send(lolembed)
            }
            catch (e) {
                message.channel.send("O invocador não possui um elo ou o nome está incorreto!")
            }
        })
    }

    if (cmd === `${prefix}report`) {

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!rUser) return message.channel.send("Não foi possível encontrar o usuário.")

        let reason = args.join(" ").slice(22)

        let reportembed = new Discord.RichEmbed()
            .setDescription("REPORTS!")
            .setColor("#8e44ad")
            .addField("Reported user:", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported by:", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel: ", message.channel)
            .addField("Time: ", message.createdAt)
            .addField("Reason: ", reason)

        let reportschannel = message.guild.channels.find(`name`, "reports")
        if (!reportschannel) return message.channel.send("Não foi possível encontrar o canal!")

        message.delete().catch(O_o => { })
        reportschannel.send(reportembed)

        return

    }

    if (cmd === `${prefix}serverinfo`) {

        let sicon = message.guild.iconURL
        let serverembed = new Discord.RichEmbed()
            .setDescription("SERVER INFORMATION!")
            .setColor("#8e44ad")
            .setThumbnail(sicon)
            .addField("Server name:", message.guild.name)
            .addField("Created on:", message.guild.createdAt)
            .addField("You Joined:", message.member.joinedAt)
            .addField("Total Members:", message.guild.memberCount)

        return message.channel.send(serverembed)
    }

    if (cmd === `${prefix}botinfo`) {

        let bicon = bot.user.displayAvatarURL
        let botembed = new Discord.RichEmbed()
            .setDescription("BOT INFORMATION!")
            .setColor("#8e44ad")
            .setThumbnail(bicon)
            .addField("Bot Name:", bot.user.username)
            .addField("Created on:", bot.user.createdAt)


        return message.channel.send(botembed)
    }
    if (cmd === `${prefix}hello`) {
        return message.channel.send("Hello! ")
    }
})

bot.login(botconfig.token)

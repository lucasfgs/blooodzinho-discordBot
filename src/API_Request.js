const https = require('https')
require('dotenv').config()
const API_KEY = process.env.LOL_API_KEY

 function getSummonerInfo(username, callback) {
        console.log('ok')
        https.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`, (resp) => {
            let data = '';
    
            resp.on('data', (response) => {
                data += response;
            });
    
            resp.on('end', () => {                
                callback(JSON.parse(data))
            })
        })    
}

function getSummonerRank(username, callback){
    

    getSummonerInfo(username, (value) =>{
        let summonerID = value.id

        https.get(`https://br1.api.riotgames.com/lol/league/v4/positions/by-summoner/${summonerID}?api_key=${API_KEY}`, (resp) => {
            let data = ''
            resp.on('data', (response) => {
                data += response

            });

            resp.on('end', () => {
                callback(JSON.parse(data))
            })
        })
    })
    
}

module.exports = {getSummonerInfo, getSummonerRank}



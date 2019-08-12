require("dotenv").config();
const api = require("./services/api");
const API_KEY = process.env.LOL_API_KEY;

const getSummonerInfo = async username => {
  try {
    const { data } = await api.get(
      `lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`
    );
    return data;
  } catch {
    return false;
  }
};
const getSummonerRank = async username => {
  let { id } = await getSummonerInfo(username);
  try {
    const { data } = await api.get(
      `lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
    );
    return data;
  } catch {
    return false;
  }
};

module.exports = { getSummonerInfo, getSummonerRank };

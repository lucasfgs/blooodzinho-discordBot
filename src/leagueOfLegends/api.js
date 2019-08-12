require("dotenv").config();
const api = require("../services/api");
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
const getTopPlayers = async (tier = "CHALLENGER", division = "I") => {
  try {
    const { data } = await api.get(
      `lol/league-exp/v4/entries/RANKED_SOLO_5x5/${tier}/${division}?page=1&api_key=${API_KEY}`
    );
    const firstPlayers = data.slice(0, 10);
    return firstPlayers;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getSummonerInfo,
  getSummonerRank,
  getTopPlayers
};

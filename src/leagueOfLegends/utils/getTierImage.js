const getTierImage = tier => {
  switch (tier) {
    case "IRON":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Iron_Emblem-150x150.png";
    case "BRONZE":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Bronze_Emblem-150x150.png";
    case "SILVER":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Silver_Emblem-150x150.png";
    case "GOLD":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Gold_Emblem-150x150.png";
    case "PLATINIUM":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Platinium_Emblem-150x150.png";
    case "DIAMOND":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Diamond_Emblem-150x150.png";
    case "MASTER":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Master_Emblem-150x150.png";
    case "GRANDMASTER":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Grandmaster_Emblem-150x150.png";
    case "CHALLENGER":
      return "https://www.lol-smurfs.com/blog/wp-content/uploads/2018/12/Challenger_Emblem-150x150.png";
    default:
      break;
  }
};

module.exports = getTierImage;

const axios = require("axios");

const { KEY } = process.env;

const Location = async (req, res) => {
  console.log("hit");
  const { LAT, LNG } = req.body;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LAT},${LNG}&radius=1500&type=golf&keyword=golf&key=${KEY}`
    )
    .then(response => {
      response;
      res.json(response.data);
    });
};
module.exports = {
  Location
};

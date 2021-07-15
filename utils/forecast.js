const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=96b95eb9c8244f20863191413210907&q=q=" +
    lat +
    "," +
    lon +
    "&aqi=no";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!"), undefined;
    } else if (body.error) {
      callback("unable to find location");
    } else {
      callback(
        undefined,
        "it is currently  " +
          body.current.temp_c +
          "  degree out. And the humidity is " +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;

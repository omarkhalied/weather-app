const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");
const { response } = require("express");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectory = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup for static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Omar",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Omar",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Omar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          Forecast: forecastData,
          Location: location,
          Address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

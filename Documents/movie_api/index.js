const express = require("express"),
  morgan = require("morgan"),
  app = express();

app.use(morgan("common"));

let movies = [
  {
    title: "An American Pickle",
  },
  {
    title: "The Kissing Booth 2",
  },
  {
    title: "You Should Have Left",
  },
  {
    title: "Made in Italy",
  },
  {
    title: "Scoob!",
  },
  {
    title: "Extraction",
  },
  {
    title: "Tax Collector",
  },
  {
    title: "The Hunt",
  },
  {
    title: "Artemis Fowl",
  },
  {
    title: "The King of Staten Island",
  },
];

app.get("/movies", function (req, res) {
  res.json(movies);
});

app.get("/documentation", function (req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/", function (req, res) {
  res.send("Welcome to the root of my app!");
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!");
});

app.listen(8080, () => console.log("Your app is listening on port 8080."));

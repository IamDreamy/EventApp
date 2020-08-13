const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    id: 1,
    title: "An American Pickle",
    description:
      "An immigrant worker falls into a vat of pickles and is brined for 100 years. The brine preserves him perfectly, and when he emerges in present day Brooklyn, he finds that he hasn't aged a day.",
    genre: ["Comedy", "Comedy-Drama"],
    lead: "Seth Rogan",
    release: "August 7, 2020",
    director: {
      name: "Brandon Trost",
      bio:
        "Brandon Scott Trost (born August 29, 1981) is an American cinematographer, screenwriter, and film director whose credits include writing and directing The FP (2011) with his brother Jason, as well as being the cinematographer of several films",
      bDay: "August 29, 1981",
      dYear: "Alive",
    },
    imagePath:
      "https://m.media-amazon.com/images/M/MV5BNmRkZmZiNzUtMzgwYy00NTEzLWE2NjctMmI3NGI5ZTBiNDdkXkEyXkFqcGdeQXVyNzE3ODQxNjU@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
  },
  {
    id: 2,
    title: "The Kissing Booth 2",
    description:
      "After a romantic summer together, Noah is off to Harvard, and Elle heads back to high school for her senior year.",
    genre: "Romantic Comedy",
    lead: ["Jacob Elordi", "Joey King"],
    release: "July 24, 2020",
    director: {
      name: "Vince Marcello",
      bio:
        "Vince Marcello is a director and writer, known for The Kissing Booth (2018), Zombie Prom (2006) and The Kissing Booth 2 (2020)",
      bDay: "1972",
      dYear: "Alive",
    },
  },
  {
    id: 3,
    title: "You Should Have Left",
    description:
      "Strange events plague a couple and their young daughter when they rent a secluded countryside house that has a dark past.",
    genre: "Horror",
    lead: ["Kevin Bacon", "Amanda Seyfried"],
    release: "June 18, 2020",
    director: {
      name: "David Koepp",
      bio:
        "David Koepp is an American screenwriter and film director. Koepp is the ninth most successful screenwriter of all time in terms of U.S. box office receipts with a total gross of over $2.3 billion.",
      bDay: "June 9, 1963",
      dYear: "Alive",
    },
  },
  {
    id: 4,
    title: "Made in Italy",
    description:
      "A London artist and his estranged son try to mend their relationship as they work together to repair a dilapidated house in Italy.",
    genre: ["Comedy", "Romance"],
    lead: "Liam Neeson",
    release: "August 7, 2020",
    director: {
      name: "James D'Arcy",
      bio:
        "James D'Arcy is an English actor. He is known for his portrayals of Howard Stark's butler, Edwin Jarvis, in the Marvel Cinematic Universe television series Agent Carter and the 2019 film Avengers: Endgame, and murder suspect Lee Ashworth in the second series of the ITV series Broadchurch.",
      bDay: "August 24, 1975",
      dYear: "Alive",
    },
  },
  {
    id: 5,
    title: "Scoob",
    description:
      " As they race to stop this global dog-pocalypse, the gang discovers that Scooby has a secret legacy and an epic destiny greater than anyone could have imagined.",
    genre: ["Animation", "Mystery"],
    lead: "Frank Welker",
    release: "May 15, 2020",
    director: {
      name: "Tony Cervone",
      bio:
        "Franklin Wendell Welker is an American actor, voice actor and former stand-up comedian with a career spanning nearly six decades. He is best known for voicing Fred Jones in the Scooby-Doo franchise since its inception in 1969, and Scooby-Doo himself since 2002.",
      bDay: "March 12, 1946",
      dYear: "Alive",
    },
  },
];

let users = [
  {
    id: 1,
    username: "johnDoe123",
    password: "password123",
    email: "nothing@gmail.com",
    dob: "July 9th, 1996",
    Favorites: [],
  },
];

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));

// Gets the list of data about ALL Movies
app.get("/movies", function (req, res) {
  res.json(movies);
});

app.get("/documentation", function (req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/", function (req, res) {
  res.send("Welcome to the root of my app!");
});
// Gets the data about a single movie title, by name
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((titles) => {
      return titles.title === req.params.title;
    })
  );
});
//Gets the data about a single movie title
//change genre to genres
app.get("/genre/:genre", (req, res) => {
  res.json(
    movies.find((genres) => {
      return genres.genre === req.params.genre;
    })
  );
});

//Gets data about all directors/or one
app.get("/movies/director/:name", (req, res) => {
  res.json(
    movies.find((direct) => {
      return direct.director.name === req.params.name;
    })
  );
});

//Allows new users to register
app.post("/users", (req, res) => {
  res.status(201).send("User added!");
});

//Updates User info
app.put("/users/:username", (req, res) => {
  res.json(
    users.find((user) => {
      return user.username === req.params.username;
    })
  );
});

//Add movie to list of favorites
app.post("/users/:username/Favorites", (req, res) => {
  res.status(201).send("New Movie Succesfully added to Favorites!");
});

//Delete movie from Favorites
app.delete("/users/:username/Favorites/:title", (req, res) => {
  res.status(200).send("Movie Succesfully Deleted from Favorites!");
});

//Deregister Current User
app.delete("/users/:id", (req, res) => {
  res.status(200).send("User succesfully deleted.");
});

//Adds data for a new movie to our list of movies
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.name) {
    const message = "Missing title in request body!";
    res.status(400).send(newMovie);
  }
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There has been an error.");
});
app.listen(8080, () => console.log("Your app is listening on port 8080."));

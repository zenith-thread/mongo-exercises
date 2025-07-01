// 1. Insert 5 movies with fields: name, year, genre, ratings, and director.
const m1 = {
  name: "Interstellar",
  year: 2014,
  genre: "sci-fi",
  ratings: 5,
  director: "Christopher Nolan",
};
const m2 = {
  name: "Inception",
  year: 2010,
  genre: "sci-fi",
  ratings: 5,
  director: "Christopher Nolan",
};
const m3 = {
  name: "The Martian",
  year: 2015,
  genre: "sci-fi",
  ratings: 4,
  director: "Ridley Scott",
};
const m4 = {
  name: "Sabrina",
  year: 2018,
  genre: "Romantic comedy",
  ratings: 3.55,
  director: "Billy Wilder",
};
const m5 = {
  name: "Eli",
  year: 2019,
  genre: "Horror",
  ratings: 2.9,
  director: "Claran Foy",
};

db.movies.insertMany([m1, m2, m3, m4, m5]);

// 2. Find all movies released after 2015.

db.movies.find({ year: { $gt: 2015 } })[
  // output
  ({
    _id: ObjectId("68637de8f2de46581e748a6c"),
    name: "Sabrina",
    year: 2018,
    genre: "Romantic comedy",
    ratings: 3.55,
    director: "Billy Wilder",
  },
  {
    _id: ObjectId("68637de8f2de46581e748a6d"),
    name: "Eli",
    year: 2019,
    genre: "Horror",
    ratings: 2.9,
    director: "Claran Foy",
  })
];

// 3. Find movies in the "sci-fi" genre with a rating greater than 4.

db.movies.find({ genre: "sci-fi", ratings: { $gt: 4 } })[
  // output
  ({
    _id: ObjectId("68637de8f2de46581e748a69"),
    name: "Interstellar",
    year: 2014,
    genre: "sci-fi",
    ratings: 8.5,
    director: "Christopher Nolan",
  },
  {
    _id: ObjectId("68637de8f2de46581e748a6a"),
    name: "Inception",
    year: 2010,
    genre: "sci-fi",
    ratings: 5,
    director: "Christopher Nolan",
  })
];

// 4. Return only name and ratings of all movies, sorted by rating in ascending order.

db.movies.find({}, { name: 1, ratings: 1, _id: 0 }).sort({ ratings: 1 })[
  // output
  ({ name: "Eli", ratings: 2.9 },
  { name: "Sabrina", ratings: 3.55 },
  { name: "The Martian", ratings: 4 },
  { name: "Interstellar", ratings: 5 },
  { name: "Inception", ratings: 5 })
];

// Count how many movies are directed by "Christopher Nolan".

db.movies.find({ director: "Christopher Nolan" }).count();

// output
2;

// Delete all movies in the "Horror" genre.

db.movies.deleteMany({ genre: "Horror" });

// output
// { acknowledged: true, deletedCount: 1 }

// Update the ratings of all movies named "Interstellar" to 8.5.

db.movies.updateMany({ name: "Interstellar" }, { $set: { ratings: 8.5 } });

// output
// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }

// 1. Insert a batch of 10 movies using insertMany(), mixing genres and ratings.

const m1 = {
  name: "Interstellar",
  year: 2014,
  genre: "Sci-fi",
  ratings: 8.7,
  director: "Christopher Nolan",
};
const m2 = {
  name: "Inception",
  year: 2010,
  genre: "Sci-fi",
  ratings: 8.8,
  director: "Christopher Nolan",
};
const m3 = {
  name: "The Martian",
  year: 2015,
  genre: "Sci-fi",
  ratings: 7.6,
  director: "Ridley Scott",
};
const m4 = {
  name: "Sabrina",
  year: 1954,
  genre: "Romantic comedy",
  ratings: 6.5,
  director: "Billy Wilder",
};
const m5 = {
  name: "Eli",
  year: 2019,
  genre: "Horror",
  ratings: 4.8,
  director: "Ciarán Foy",
};
const m6 = {
  name: "Parasite",
  year: 2019,
  genre: "Thriller",
  ratings: 8.5,
  director: "Bong Joon-ho",
};
const m7 = {
  name: "The Godfather",
  year: 1972,
  genre: "Crime",
  ratings: 9.2,
  director: "Francis Ford Coppola",
};
const m8 = {
  name: "La La Land",
  year: 2016,
  genre: "Musical",
  ratings: 7.8,
  director: "Damien Chazelle",
};
const m9 = {
  name: "Mad Max: Fury Road",
  year: 2015,
  genre: "Action",
  ratings: 8.1,
  director: "George Miller",
};
const m10 = {
  name: "Get Out",
  year: 2017,
  genre: "Horror",
  ratings: 7.4,
  director: "Jordan Peele",
};

db.movies.insertMany([m1, m2, m3, m4, m5, m6, m7, m8, m9, m10]);

// output
// {
//   acknowledged: true,
//   insertedIds: {
//     '0': ObjectId('68638295d2d32dae30748a5f'),
//     '1': ObjectId('68638295d2d32dae30748a60'),
//     '2': ObjectId('68638295d2d32dae30748a61'),
//     '3': ObjectId('68638295d2d32dae30748a62'),
//     '4': ObjectId('68638295d2d32dae30748a63'),
//     '5': ObjectId('68638295d2d32dae30748a64'),
//     '6': ObjectId('68638295d2d32dae30748a65'),
//     '7': ObjectId('68638295d2d32dae30748a66'),
//     '8': ObjectId('68638295d2d32dae30748a67'),
//     '9': ObjectId('68638295d2d32dae30748a68')
//   }
// }

// 2. Find the top 3 highest-rated "Sci-fi" movies, returning only name and ratings.

db.movies
  .find({ genre: "Sci-fi" }, { name: 1, ratings: 1, _id: 0 })
  .sort({ ratings: -1 })
  .limit(3)[
  //output
  ({ name: "Inception", ratings: 8.8 },
  { name: "Interstellar", ratings: 8.7 },
  { name: "The Martian", ratings: 7.6 })
];

// 3. Find all movies that are either in the "Drama" genre or have a rating less than 6.

db.movies.find({ $or: [{ genre: "Drama" }, { ratings: { $lt: 6 } }] })[
  //output
  {
    _id: ObjectId("68638295d2d32dae30748a63"),
    name: "Eli",
    year: 2019,
    genre: "Horror",
    ratings: 4.8,
    director: "Ciarán Foy",
  }
];

// Use $in to find movies in either "Comedy", "Action", or "Sci-Fi" genres.

db.movies.find({ genre: { $in: ["Comedy", "Action", "Sci-fi"] } })[
  // output
  ({
    _id: ObjectId("68638295d2d32dae30748a5f"),
    name: "Interstellar",
    year: 2014,
    genre: "Sci-fi",
    ratings: 8.7,
    director: "Christopher Nolan",
  },
  {
    _id: ObjectId("68638295d2d32dae30748a60"),
    name: "Inception",
    year: 2010,
    genre: "Sci-fi",
    ratings: 8.8,
    director: "Christopher Nolan",
  },
  {
    _id: ObjectId("68638295d2d32dae30748a61"),
    name: "The Martian",
    year: 2015,
    genre: "Sci-fi",
    ratings: 7.6,
    director: "Ridley Scott",
  },
  {
    _id: ObjectId("68638295d2d32dae30748a67"),
    name: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action",
    ratings: 8.1,
    director: "George Miller",
  })
];

// Use $and to find movies with rating > 7 and year < 2010.

db.movies.find({ $and: [{ ratings: { $gt: 7 } }, { year: { $lt: 2010 } }] })[
  // output
  {
    _id: ObjectId("68638295d2d32dae30748a65"),
    name: "The Godfather",
    year: 1972,
    genre: "Crime",
    ratings: 9.2,
    director: "Francis Ford Coppola",
  }
];

// Find the third lowest-rated movie in the collection.

db.movies.find().sort({ ratings: 1 }).limit(1).skip(2)[
  // output
  {
    _id: ObjectId("68638295d2d32dae30748a68"),
    name: "Get Out",
    year: 2017,
    genre: "Horror",
    ratings: 7.4,
    director: "Jordan Peele",
  }
];

// Find the number of movies that were released between 2000 and 2010 inclusive.

db.movies.find({ $and: [{ year: { $gt: 2000 } }, { year: { $lte: 2010 } }] })[
  // output
  {
    _id: ObjectId("68638295d2d32dae30748a60"),
    name: "Inception",
    year: 2010,
    genre: "Sci-fi",
    ratings: 8.8,
    director: "Christopher Nolan",
  }
];

// Update all movies with rating below 4 to have a genre "Trash".

db.movies.updateMany({ ratings: { $lt: 4 } }, { $set: { genre: "Trash" } });
//output
// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 0,
//   modifiedCount: 0,
//   upsertedCount: 0
// }

// LEARNING OUTCOMES:

// 1. Query filters with logical operators ($or, $and)
// 2. Array and equality filters ($in)
// 3. Projections
// 4. Sorting (ascending vs. descending)
// 5. Limiting and skipping
// 6. Updates
// 7. Clean batch inserts

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Sci-fi",
  "Romantic comedy",
  "Crime",
  "Musical",
  "Fantasy",
  "Adventure",
  "Biography",
  "Documentary",
  "Mystery",
  "Animation",
  "Family",
];

const directors = [
  "Christopher Nolan",
  "Quentin Tarantino",
  "Steven Spielberg",
  "Martin Scorsese",
  "Ridley Scott",
  "James Cameron",
  "Kathryn Bigelow",
  "Jordan Peele",
  "Greta Gerwig",
  "Sofia Coppola",
  "Wes Anderson",
  "Denis Villeneuve",
  "Bong Joon-ho",
  "Patty Jenkins",
  "Alfonso Cuarón",
  "Guillermo del Toro",
  "Coen Brothers",
  "Ava DuVernay",
  "Damien Chazelle",
  "George Miller",
];

const adjectives = [
  "Dark",
  "Silent",
  "Brave",
  "Lost",
  "Hidden",
  "Last",
  "First",
  "Golden",
  "Broken",
  "Burning",
  "Frozen",
  "Secret",
  "Forgotten",
  "Crimson",
  "Electric",
];

const nouns = [
  "Empire",
  "Dream",
  "Journey",
  "Hope",
  "Desire",
  "Game",
  "Voice",
  "Night",
  "Storm",
  "Truth",
  "Warrior",
  "Path",
  "Edge",
  "Memory",
  "Signal",
];

// Generate 50 movie objects
const movies = [];

for (let i = 1; i <= 50; i++) {
  const name = `The ${
    adjectives[Math.floor(Math.random() * adjectives.length)]
  } ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  const year = Math.floor(Math.random() * (2024 - 1950 + 1)) + 1950;
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const ratings = parseFloat((Math.random() * (9.5 - 1.0) + 1.0).toFixed(1));
  const director = directors[Math.floor(Math.random() * directors.length)];

  movies.push({
    name,
    year,
    genre,
    ratings,
    director,
  });
}

// Insert into the 'movies' collection
db.movies.insertMany(movies);

//output
// {  acknowledged: true, insertIds: {all 50 of them}}

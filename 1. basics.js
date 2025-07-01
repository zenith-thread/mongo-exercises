// CREATE
db.movies.insertOne({}); // insert one document/object into the collection
db.movies.insertMany([{}, {}, {}]); // insert many documents/objects into the collection

// READ
db.movies.find(); // returns all documents with all the fields
db.movies.find({ name: "Interstellar" }); // will only return the document with all the fields which matches the name
db.movies.find({ name: "Interstellar" }, { name: 1, _id: 0 }); // will only return the document which matches the name but this time only the name
db.movies.find({}, { name: 1, _id: 0 }); // will return all the documents but only the name field
db.movies.find().count(); // returns the number of documents in the collections.
db.movies.find().limit(2); // returns only 2 documents with all the fields
db.movies.find({}, { name: 1, _id: 0 }).limit(2); // returns only 2 movies but only the name field
db.movies.find({}, { name: 1, _id: 0 }).sort({ name: 1 }); // returns all the movies with name field sorted alphabetically
db.movies.find({}, { name: 1, _id: 0 }).sort({ rating: 1 }); // returns all the movies with name field sorted by rating in ascending order
db.movies.find({}, { name: 1, _id: 0 }).sort({ rating: -1 }); // returns all the movies with name field sorted by rating in descending order
db.movies.find({}, { name: 1, _id: 0 }).sort({ rating: -1 }).limit(3); // returns top 3 movies with the highest rating
db.movies.find({}, { name: 1, _id: 0 }).sort({ name: 1 }).skip(2); // it will skip the first two movies and give the rest
db.movies.find({}, { name: 1, _id: 0 }).sort({ rating: -1 }).limit(1).skip(1); // returns the second highest rated movie name
db.movies
  .find({ ratings: { $lt: 5 } })
  .sort({ ratings: -1 })
  .limit(1)
  .skip(1); // returns second highest rated movie which has the rating less than 5.

// UPDATE
db.movies.updateOne(
  { name: "Interstellar" },
  { $set: { name: "Interstellar Updated" } }
); // first it finds the movie with the name "Interstellar" then updates the name to "Interstellar Updated"
db.movies.updateMany({ ratings: 5 }, { $set: { ratings: 2 } }); // Update all the movies' ratings from 5 to 2

// DELETE
db.movies.deleteOne({ name: "Interstellar" }); // delete movie with the name Interstellar
db.movies.deleteMany({ ratings: { $gt: 4.5 } }); // deletes all the movies with ratings greater than 4.5
db.movies.drop(); // drops the entire collection

db.orders.deleteMany({});
db.orders.insertMany([
  {
    order_id: 6363763262239,
    products: [
      {
        prod_id: "abc12345",
        name: "Asus Laptop",
        price: 431,
      },
      {
        prod_id: "def45678",
        name: "Karcher Hose Set",
        price: 22,
      },
    ],
  },
  {
    order_id: 1197372932325,
    products: [
      {
        prod_id: "abc12345",
        name: "Asus Laptop",
        price: 429,
      },
    ],
  },
  {
    order_id: 9812343774839,
    products: [
      {
        prod_id: "pqr88223",
        name: "Morphy Richards Food Mixer",
        price: 431,
      },
      {
        prod_id: "def45678",
        name: "Karcher Hose Set",
        price: 21,
      },
    ],
  },
  {
    order_id: 4433997244387,
    products: [
      {
        prod_id: "def45678",
        name: "Karcher Hose Set",
        price: 23,
      },
      {
        prod_id: "jkl77336",
        name: "Picky Pencil Sharpener",
        price: 1,
      },
      {
        prod_id: "xyz11228",
        name: "Russell Hobbs Chrome Kettle",
        price: 16,
      },
    ],
  },
]);

db.orders.aggregate([
  // First stage: unwind the products array
  {
    $unwind: { path: "$products" },
  },
  // Second stage: Match products that costs more than $15
  {
    $match: { "products.price": { $gt: 15 } },
  },
  // Third stage: Group products by product type/name
  {
    $group: {
      _id: "$products.prod_id",
      product: { $first: "$products.name" },
      total_cost: { $sum: "$products.price" },
      total_orders: { $sum: 1 },
    },
  },
  // Fourth stage: Display the product ID
  {
    $set: { product_ID: "$_id" },
  },
  // Fifth stage: Remove the _id set by the mongodb from the output
  {
    $unset: ["_id"],
  },
]);

// |---------------|----------------------------------------|
// | Field	       | Meaning                                |
// |---------------|----------------------------------------|
// | product	   | Name of the product (from $first)      |
// |---------------|----------------------------------------|
// | total_cost	   | Total revenue from that product        |
// |---------------|----------------------------------------|
// | total_orders  | Number of times it was ordered         |
// |---------------|----------------------------------------|
// | product_ID	   | Product ID (prod_id) you grouped by    |
// |---------------|----------------------------------------|

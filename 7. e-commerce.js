for (let i = 0; i < 10000; i++) {
  const productsCatalog = [
    { prod_id: "abc123", name: "Wireless Mouse", price: 22 },
    { prod_id: "xyz789", name: "Laptop Stand", price: 35 },
    { prod_id: "lmn456", name: "USB-C Hub", price: 45 },
    { prod_id: "def321", name: "Mechanical Keyboard", price: 70 },
    { prod_id: "ghi654", name: "Noise Cancelling Headphones", price: 120 },
    { prod_id: "jkl987", name: "Webcam", price: 50 },
    { prod_id: "mno741", name: "Monitor", price: 200 },
    { prod_id: "pqr852", name: "External SSD", price: 150 },
    { prod_id: "stu963", name: "Ergonomic Chair", price: 300 },
    { prod_id: "vwx159", name: "Desk Lamp", price: 40 },
  ];

  const getRandomProducts = () => {
    const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 products
    const shuffled = productsCatalog.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Generate only 100 distinct email addresses (user0@example.com to user99@example.com)
  const getRandomEmail = () => {
    const id = Math.floor(Math.random() * 100);
    return `user${id}@example.com`;
  };

  const getRandomDate = () => {
    const start = new Date(2005, 0, 1);
    const end = new Date(2024, 11, 31);
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  db.ecommerce.insertOne({
    customer_id: getRandomEmail(),
    orderdate: getRandomDate(),
    products: getRandomProducts(),
  });
}

// --------------- BASIC AGGREGATIONS ---------------

// 1. Get the total number of orders per customer.
// (Group by customer, count orders.)

db.ecommerce.aggregate([
  // First stage: unwind the products array
  {
    $unwind: { path: "$products" },
  },
  // Second stage: group each document by customer and count the orders
  {
    $group: {
      _id: "$customer_id",
      total_orders: { $sum: 1 },
    },
  },
  // Third stage: Display the customer email
  {
    $set: { customer_email: "$_id" },
  },
  // Remove _id from the output
  {
    $unset: ["_id"],
  },
]);

// 2. Get the total amount spent by each customer in 2022.
// (Match 2022 dates → Unwind → Group by customer → Sum prices.)
db.ecommerce.aggregate([
  // First stage: match by orderdate (2022)
  {
    $match: {
      orderdate: {
        $gte: new Date("2022-01-01T00:00:00Z"),
        $lt: new Date("2023-01-01T00:00:00Z"),
      },
    },
  },
  // Second stage: unwind the products array
  {
    $unwind: { path: "$products" },
  },
  // Third stage: group by customer and find total spent by each customer
  {
    $group: {
      _id: "$customer_id",
      total_spent: { $sum: "$products.price" },
    },
  },
  // Third stage: Display the customer email
  {
    $set: { customer_email: "$_id" },
  },
  // Fourth stage: Remove _id from the output
  {
    $unset: ["_id"],
  },
]);

// 3. Find the first purchase date of every customer.
// (Match by year → Sort by date → Group by customer → Use $first.)
db.ecommerce.aggregate([
  // First stage: sort by order date in ascending order
  {
    $sort: {
      orderdate: 1,
    },
  },
  // Second stage: group by customer and get each customer's first order date
  {
    $group: {
      _id: "$customer_id",
      first_order_date: { $first: "$orderdate" },
    },
  },
  // Third stage: sort by first order date of the output so we can see output in ascending order
  {
    $sort: {
      first_order_date: 1,
    },
  },
  // Fourth stage: Display the customer email
  {
    $set: { customer_email: "$_id" },
  },
  // Fifth stage: Remove _id from the output
  {
    $unset: ["_id"],
  },
]);

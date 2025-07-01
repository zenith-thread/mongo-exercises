// CREATE orders collection

db.orders.deleteMany({});
db.orders.insertMany([
  {
    customer_id: "elise_smith@myemail.com",
    orderdate: new Date("2020-05-30T08:35:52Z"),
    value: 231,
  },
  {
    customer_id: "elise_smith@myemail.com",
    orderdate: new Date("2020-01-13T09:32:07Z"),
    value: 99,
  },
  {
    customer_id: "oranieri@warmmail.com",
    orderdate: new Date("2020-01-01T08:25:37Z"),
    value: 63,
  },
  {
    customer_id: "tj@wheresmyemail.com",
    orderdate: new Date("2019-05-28T19:13:32Z"),
    value: 2,
  },
  {
    customer_id: "tj@wheresmyemail.com",
    orderdate: new Date("2020-11-23T22:56:53Z"),
    value: 187,
  },
  {
    customer_id: "tj@wheresmyemail.com",
    orderdate: new Date("2020-08-18T23:04:48Z"),
    value: 4,
  },
  {
    customer_id: "elise_smith@myemail.com",
    orderdate: new Date("2020-12-26T08:55:46Z"),
    value: 4,
  },
  {
    customer_id: "tj@wheresmyemail.com",
    orderdate: new Date("2021-02-29T07:49:32Z"),
    value: 1024,
  },
  {
    customer_id: "elise_smith@myemail.com",
    orderdate: new Date("2020-10-03T13:49:44Z"),
    value: 102,
  },
]);

db.orders.aggregate([
  // First stage: filter the documents based on orderdate
  // orderdate that we want to filter is between 2020 and 2021
  {
    $match: {
      orderdate: {
        $gte: new Date("2020-01-01T00:00:00Z"),
        $lt: new Date("2021-01-01T00:00:00Z"),
      },
    },
  },
  // Second stage: sort by orderdate in ascending order
  // we are doing this sort so we can have the first orderdate
  // $first requires the documents to be in order
  {
    $sort: { orderdate: 1 },
  },

  // Third stage: group the data by customer_id
  // when the first order date for the customer appeared
  // calculate the total value i.e. the total spent by the customer
  // calculate the total orders by the customer
  // an order array which contains individual order data of the customer
  {
    $group: {
      _id: "$customer_id",
      first_order_date: { $first: "$orderdate" },
      total_spent: { $sum: "$value" },
      total_orders: { $sum: 1 },
      orders: {
        $push: {
          orderdate: "$orderdate",
          price: "$value",
        },
      },
    },
  },
  // Fourth Stage: sort the documents we got from the group stage by first order date
  {
    $sort: { first_order_date: 1 },
  },
  // Fifth stage: set the customer_id in the output
  {
    $set: { customer_email: "$_id" },
  },
  // Sixth stage: remove the _id set by the mongodb
  {
    $unset: ["_id"],
  },
]);

// | -------|-----------------------------------|--------------------------------------------------|
// | Stage	| Purpose	                        | Comment                                          |
// | -------|-----------------------------------|--------------------------------------------------|
// | $match	| Filters 2020 orders	            | Accurate date filtering                          |
// | -------|-----------------------------------|--------------------------------------------------|
// | $sort	| Orders by orderdate for $first	| Essential for $first to work                     |
// | -------|-----------------------------------|--------------------------------------------------|
// | $group	| Summarizes per customer           | Clean naming (total_spent, total_orders, orders) |
// | -------|-----------------------------------|--------------------------------------------------|
// | $sort	| Sort by first_order_date	        | Makes final output intuitive                     |
// | -------|-----------------------------------|--------------------------------------------------|
// | $set	| Adds customer_email field	        | Semantic and readable                            |
// | -------|-----------------------------------|--------------------------------------------------|
// | $unset	| Removes _id	                    | Clean final structure                            |
// | -------|-----------------------------------|--------------------------------------------------|

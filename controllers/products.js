const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  console.log(
    "🚀 ~ file: product.js ~ line 2 ~ getAllProducts ~ req",
    req.query
  );

  // ------------------ search by comapny and name

  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company; // { company: 'apple' } - queryObject.company
  }

  // -------------- search name with regex

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // { name: 'apple' } - queryObject.name
  }

  if (featured) {
    queryObject.featured = compafeaturedny;
  }

  let apiData = Product.find(queryObject);
  //http://localhost:5000/api/products?sort=name,-price

  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }

  //http://localhost:5000/api/products?select=name,-price
  // select=name,company,price

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;

  let skip = (page - 1) * limit;

  // page = 2;
  // limit = 3;
  // skip = 1 * 3 = 3;

  skip = apiData = apiData.skip(skip).limit(limit);

  console.log(queryObject);

  const myData = await apiData;

  res.status(200).json({ myData, nbHits: myData.length });

  //  const myData = await Product.find(req.query);

  // filter by name
  //const myData = await Product.find({ name: "iphone" });

  // res.status(200).json({ myData });
};

// Filter  search functionality using req.query

const getAllProductsTesting = async (req, res) => {
  // sort asc-desc
  // asc= sort("name")
  // desc= sort("-name")

  //http://localhost:5000/api/products/testing?select=name,company

  const myData = await Product.find(req.query).select("name company");

  // sort=name,price;

  console.log(
    "🚀 ~ file: product.js ~ line 2 ~ getAllProductsTesting ~ req",
    req.query
  );
  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };

// Page, Page number, limits
// 1-10
// 11-20
// 21-30

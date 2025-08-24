import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import Product from "../src/models/Product.js";
import User from "../src/models/User.js";
import products from "./seedProducts.json" assert { type: "json" };

dotenv.config();
await connectDB();

const run = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Product.insertMany(products);
    // create default admin
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
      isAdmin: true
    });
    console.log("Seeded products and admin user (admin@example.com / admin123)");
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
};

run();

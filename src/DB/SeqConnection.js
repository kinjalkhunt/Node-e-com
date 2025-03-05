import { Sequelize } from "sequelize";

const db_name = process.env.DB_NAME || "e-commerce";
const db_user = process.env.DB_USER || "root";
const db_password = process.env.DB_PASSWORD || "";
const db_host = process.env.DB_HOST || "localhost";
const db_dialect = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    dialect: db_dialect,
    logging: false, // Disable logging queries in console
});

// Function to connect and sync database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");

        await sequelize.sync({ alter: true }); // This will create/update tables
        console.log("✅ All tables synchronized successfully!");

    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
};

connectDB();

export default sequelize;




// import { Sequelize } from "sequelize";
// import mysql from "mysql2/promise"; // Use mysql2/promise for executing raw queries
// import dotenv from "dotenv";

// dotenv.config();

// const DB_NAME = process.env.DB_NAME || "e-commerce";
// const DB_USER = process.env.DB_USER || "root";
// const DB_PASSWORD = process.env.DB_PASSWORD || "";
// const DB_HOST = process.env.DB_HOST || "127.0.0.1"; // Use 127.0.0.1 instead of localhost
// const DB_PORT = process.env.DB_PORT || 3306;

// // Function to create database if not exists At First time
// const createDatabase = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: DB_HOST,
//       port: DB_PORT,
//       user: DB_USER,
//       password: DB_PASSWORD,
//     });

//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
//     console.log(`✅ Database "${DB_NAME}" ensured.`);
//     await connection.end();
//   } catch (error) {
//     console.error("❌ Error ensuring database:", error);
//   }
// };

// // Create database first, then connect Sequelize
// const initializeDatabase = async () => {
//   await createDatabase();

//   const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: "mysql",
//     logging: false,
//     port: DB_PORT,
//   });

//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected successfully.");
//   } catch (error) {
//     console.error("❌ Unable to connect to the database:", error);
//   }

//   return sequelize;
// };

// const sequelize = await initializeDatabase();

// export default sequelize;
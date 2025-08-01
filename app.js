import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import sequelize from "./db/sequelize.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});

try {
  await sequelize.authenticate()
  console.log("✅ Database connection successful")

  // await sequelize.sync({ alter: true });
  // console.log("✅ All models were synchronized");

} catch (e) {
  console.log("❌ Database connection error: ", e)
  process.exit(1)
}
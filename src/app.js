const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// To receive the JWT token we need the middleware
app.use(cookieParser());

// middleware to convert the request data into JSON data
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connected succesfully");
    app.listen(3000, () => {
      console.log("server started succesfully");
    });
  })
  .catch(() => {
    console.log("database connection failed");
  });

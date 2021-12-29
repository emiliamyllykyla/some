require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const protectedRoute = require("./routes/protected");

app.use(express.json());
app.use(cookieParser());
app.use("/users", authRoute);
app.use("/posts", postsRoute);
app.use("/protected", protectedRoute)

app.listen(port, () => console.log(`Listening on port ${port}`));

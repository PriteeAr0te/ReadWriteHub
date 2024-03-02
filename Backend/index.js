const express = require("express");
const connectToMongo = require("./db");
const app = express();
const port = process.env.PORT || 5000;
const { router, verifyMail } = require("./Routes/auth");

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use(express.json());

connectToMongo();
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/api/auth", router);
app.use("/api/books", require("./Routes/books"));
app.use("/api/handlebooks", require("./Routes/bookManipulation"));
app.use("/api/reader", require("./Routes/readers"));

app.get("/verify", verifyMail);

app.listen(port, () => {
  console.log(`ReadWriteHub listening on port: ${port}`);
});

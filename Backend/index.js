const express = require("express");
const path = require("path");
const cors = require("cors");
const connectToMongo = require("./db");
const app = express();
const port = process.env.PORT || 5000;
const { router, verifyMail } = require("./Routes/auth");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use(express.json());

connectToMongo();

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/auth", router);
// app.use("/api/books", upload.single("image"), require("./Routes/books"));
app.use("/api/books", require("./Routes/books"));
app.use("/api/handlebooks", require("./Routes/bookManipulation"));
app.use("/api/reader", require("./Routes/readers"));

app.get("/verify", verifyMail);

// Handle all other routes by serving the main HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log(`ReadWriteHub listening on port: ${port}`);
});

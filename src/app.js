const path = require("path");
const express = require("express");
const reportRoute = require("./routes/report");
require("./db");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/reports", reportRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is up at port", PORT);
});

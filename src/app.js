const express = require("express");
const userRoute = require("./routes/user");
require("./db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is up at port", PORT);
});

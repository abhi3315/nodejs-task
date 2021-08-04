const app = require("./src/app");
const { connectToDB } = require("./src/db");

connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is up at port", PORT);
});

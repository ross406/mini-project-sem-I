const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/result", require("./routes/result"));

app.use("/questions", require("./routes/questions"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});

const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const PORT = 8000;

// Enable CORS
app.use(cors());

app. use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add express-status-monitor
const status = require('express-status-monitor');

app.use(status());

// app.use("/", (req, res) =>{
//   res.send("Hello, World!")
//   .status(200)
// })

// Use upload routes
app.use("/api", uploadRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

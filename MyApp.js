require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Use body-parser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Root-Level Middleware: Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// GET /name - Query parameters
app.get('/name', (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
});

// POST /name - Form data in req.body
app.post('/name', (req, res) => {
  const firstName = req.body.first; // Extract 'first' from req.body
  const lastName = req.body.last;  // Extract 'last' from req.body
  res.json({ name: `${firstName} ${lastName}` }); // Respond with the combined name
});

// Serve the frontpage with the form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  const message = "Hello json";

  if (messageStyle === "uppercase") {
    res.json({ message: message.toUpperCase() });
  } else {
    res.json({ message });
  }
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

module.exports = app;

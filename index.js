const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(require("./routes/index.routes"));
app.listen(80);

var fs = require("fs");
var https = require("https");
var privateKey = fs.readFileSync("sslcert/privkey.pem", "utf8");
var certificate = fs.readFileSync("sslcert/cert.pem", "utf8");
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);

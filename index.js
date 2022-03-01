const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
var https = require("https");
var privateKey = fs.readFileSync("sslcert/private.key", "utf8");
var certificate = fs.readFileSync("sslcert/certificate.crt", "utf8");
require("dotenv").config();

var credentials = { key: privateKey, cert: certificate };
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

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(80);

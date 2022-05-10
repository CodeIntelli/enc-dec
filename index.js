import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 6400;
var RNCryptor = require("jscryptor");
var multipart = require("connect-multiparty");
global.app = module.exports = express();
app.use(multipart());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/enc", (req, res) => {
  var enc = RNCryptor.Encrypt(JSON.stringify(req.body), process.env.KEY);
  res.send(enc);
});
app.post("/dec", (req, res) => {
  var enc = RNCryptor.Decrypt(req.body.secureData, process.env.KEY);
  res.send(JSON.parse(enc));
});

app.listen(PORT, () => {
  console.log("server connected", PORT);
});

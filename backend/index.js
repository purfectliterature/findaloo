const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello Agnes!"));

app.listen(port, () => console.log(`Express is running at https://localhost:${port}!`));
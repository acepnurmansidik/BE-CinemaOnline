const express = require("express");

//use express in app variable
const app = express();

//define the server port
const port = 5000;

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));

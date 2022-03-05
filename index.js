const express = require("express");
const cors = require("cors");

// Get routes to the variabel
const authRouter = require("./app/Auth/router");
const filmRouter = require("./app/Film/router");
const categoryRouter = require("./app/Category/router");
const transactionRouter = require("./app/Transaction/router");
const userRouter = require("./app/User/router");

//use express in app variable
const app = express();
// create API version
const API = `/api/v1`;

//define the server port
const port = proccess.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Add endpoint grouping and router
app.use(`${API}`, authRouter);
app.use(`${API}`, filmRouter);
app.use(`${API}`, categoryRouter);
app.use(`${API}`, transactionRouter);
app.use(`${API}`, userRouter);

// add route here to serving static file
app.use("/uploads", express.static("uploads"));

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));

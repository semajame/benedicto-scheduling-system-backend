﻿require("rootpath")();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("_middleware/error-handler");
const scheduleRoutes = require("./schedule/1st/schedule.controller");

const secondSchedRoute = require("./schedule/2nd/schedule.controller");

const thirdSchedRoute = require("./schedule/3rd/schedule.controller");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// api routes
app.use("/accounts", require("./accounts/accounts.controller"));

// SCHEDULE
app.use("/schedule", scheduleRoutes);
app.use("/schedule", secondSchedRoute);
app.use("/schedule", thirdSchedRoute);

app.use("/teachers", require("./teachers/teachers.controller"));
// swagger docs route
app.use("/api-docs", require("_helpers/swagger"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));

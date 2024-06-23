const express = require("express");
const router = express.Router();
const Joi = require("joi");
const db = require("_helpers/db");
const validateRequest = require("_middleware/validate-request");

function scheduleSchema(req, res, next) {
  const schema = Joi.object({
    sub_code: Joi.string().required(),
    subject: Joi.string().required(),
    units: Joi.number().integer().required(),
    room: Joi.string().required(),
    from: Joi.string().isoDate().required(),
    to: Joi.string().isoDate().required(),
  });
  validateRequest(req, next, schema);
}

router.get("/2nd-year", async (req, res) => {
  try {
    const schedules = await db.secondSchedule.findAll();
    res.json(schedules);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/2nd-year", scheduleSchema, async (req, res) => {
  try {
    const { sub_code, subject, units, room, from, to } = req.body;
    const newSchedule = await db.secondSchedule.create({
      sub_code,
      subject,
      units,
      room,
      from,
      to,
    });
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

// Additional CRUD operations (PUT, DELETE) can be added here

module.exports = router;

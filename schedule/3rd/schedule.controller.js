const express = require("express");
const router = express.Router();
const Joi = require("joi");
const db = require("_helpers/db");
const validateRequest = require("_middleware/validate-request");

function scheduleSchema(req, res, next) {
  const schema = Joi.object({
    subject_code: Joi.string().required(),
    subject: Joi.string().required(),
    units: Joi.number().integer().required(),
    location: Joi.string().required(),
    start: Joi.string().isoDate().required(),
    end: Joi.string().isoDate().required(),
    recurrencePattern: Joi.string(),
    background: Joi.string(),
  });
  validateRequest(req, next, schema);
}

router.get("/3rd-year", async (req, res) => {
  try {
    const schedules = await db.thirdSchedule.findAll();
    res.json(schedules);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/3rd-year", scheduleSchema, async (req, res) => {
  try {
    const params = req.body;

    // Check if the sub_code already exists
    if (
      await db.thirdSchedule.findOne({
        where: { subject_code: params.subject_code },
      })
    ) {
      return res.status(400).json({ message: "Subject code already exists" });
    }

    // Create the new schedule
    const newSchedule = await db.thirdSchedule.create(params);
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

// Additional CRUD operations (PUT, DELETE) can be added here

module.exports = router;

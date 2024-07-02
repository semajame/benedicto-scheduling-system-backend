const express = require("express");
const router = express.Router();
const Joi = require("joi");
const db = require("_helpers/db");
const validateRequest = require("_middleware/validate-request");

function teacherSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string(),
    address: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

router.get("/all-teachers", async (req, res) => {
  try {
    const teachers = await db.Teachers.findAll();
    res.json(teachers);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add-teacher", teacherSchema, async (req, res) => {
  try {
    const params = req.body;

    // Check if the sub_code already exists
    // if (
    //   await db.Teachers.findOne({
    //     where: { subject_code: params.subject_code },
    //   })
    // ) {
    //   return res.status(400).json({ message: "Subject code already exists" });
    // }

    // Create the new teacher
    const newTeacher = await db.Teachers.create(params);
    res.status(201).json(newTeacher);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

// Additional CRUD operations (PUT, DELETE) can be added here

module.exports = router;

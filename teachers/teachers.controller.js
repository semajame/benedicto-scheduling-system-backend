const express = require("express");
const { Sequelize } = require("sequelize");
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

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teachers = await db.Teachers.findByPk(id);
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
    if (
      await db.Teachers.findOne({
        where: { firstName: params.firstName, lastName: params.lastName },
      })
    ) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    if (req.file) {
      params.pictureUrl = `/uploads/${req.file.filename}`;
    }

    // Create the new teacher
    const newTeacher = await db.Teachers.create(params);
    res.status(201).json(newTeacher);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/edit-teacher/:id", teacherSchema, async (req, res) => {
  try {
    const teacherId = req.params.id;
    const params = req.body;

    // Find the teacher by the unique identifier (teacherId)
    const teacher = await db.Teachers.findOne({
      where: { id: teacherId },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Check if another teacher with the same firstName and lastName already exists
    const existingTeacher = await db.Teachers.findOne({
      where: {
        firstName: params.firstName,
        lastName: params.lastName,
        id: { [Sequelize.Op.ne]: teacherId },
      },
    });

    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Another teacher with the same name already exists" });
    }

    if (req.file) {
      params.pictureUrl = `/uploads/${req.file.filename}`;
    }

    // Update the teacher
    await teacher.update(params);
    res.status(200).json(teacher);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-teacher/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await db.Teachers.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await teacher.destroy();
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: err.message });
  }
});

// Additional CRUD operations (PUT, DELETE) can be added here

module.exports = router;

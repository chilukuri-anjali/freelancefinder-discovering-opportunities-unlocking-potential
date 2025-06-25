const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// 🔹 POST a new project
router.post('/create', async (req, res) => {
  const { title, description, budget, skillsRequired, client } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      budget,
      skillsRequired,
      client
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// 🔹 GET all active projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).populate('client', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

module.exports = router;

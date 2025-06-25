const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// 🔹 POST a new application (freelancer applies for a project)
router.post('/apply', async (req, res) => {
  const { freelancer, project, proposalText, proposedRate, portfolioLink } = req.body;

  try {
    const application = new Application({
      freelancer,
      project,
      proposalText,
      proposedRate,
      portfolioLink
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// 🔹 GET all applications for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const applications = await Application.find({ project: req.params.projectId })
      .populate('freelancer', 'name email');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;

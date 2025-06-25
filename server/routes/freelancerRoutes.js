const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');

// 🔹 Create or update freelancer profile
router.post('/update', async (req, res) => {
  const { user, skills, experience, rating } = req.body;

  try {
    const existingFreelancer = await Freelancer.findOne({ user });

    if (existingFreelancer) {
      existingFreelancer.skills = skills;
      existingFreelancer.experience = experience;
      existingFreelancer.rating = rating;
      await existingFreelancer.save();
      res.json({ message: 'Freelancer profile updated', freelancer: existingFreelancer });
    } else {
      const newFreelancer = new Freelancer({
        user,
        skills,
        experience,
        rating
      });
      await newFreelancer.save();
      res.status(201).json({ message: 'Freelancer profile created', freelancer: newFreelancer });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update freelancer profile' });
  }
});

// 🔹 Get a freelancer profile by user ID
router.get('/:userId', async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ user: req.params.userId }).populate('user', 'name email');
    res.json(freelancer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch freelancer profile' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getWorks,
  addWork,
  deleteWork,
} = require('../controllers/portfolioController');

router.get('/', getWorks);
router.post('/', addWork);
router.delete('/:id', deleteWork);

module.exports = router;

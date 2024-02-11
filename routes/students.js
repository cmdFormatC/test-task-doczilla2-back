const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getStudents,
  createStudent,
  deleteStudent,
} = require('../controllers/students')

router.get('/', getStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);

module.exports = router;

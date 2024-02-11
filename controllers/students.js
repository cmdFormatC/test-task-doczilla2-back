const { handleErrorConstructor } = require('../utils/handleErrorTools')
const {
  getStudentsFromDb,
  pushStudent,
  deleteStudentFromDb,
} = require('../utils/dbTools')

const getStudents = async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || undefined;
  const offset = parseInt(req.query.offset, 10) || null;
  try {
    const students = await getStudentsFromDb(limit, offset);
    res.send({students: students});
  } catch (err) {
    return next(handleErrorConstructor(500, err.message));
  }
}

const createStudent = async (req, res, next) => {
  try {
    const item = req.body.student;
    if (!item.fullName || !item.dob || !item.group) {
      return next(handleErrorConstructor(400, 'Отсутствует обязательное поле'));
    }
    const addedstudend = await pushStudent(item);
    res.send({student: addedstudend});
  } catch (err) {
    if (err.code === '23505') {
      return next(handleErrorConstructor(400, 'Такой студент уже существует'));
    } else if (err.code === '22P02') {
      return next(handleErrorConstructor(400, 'Неверный формат данных'));
    } else {
      return next(handleErrorConstructor(500, err.message));
    }
  }
}

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(handleErrorConstructor(400, 'Некорректный запрос'));
    }
    const deletedStudent = await deleteStudentFromDb(id);
    if (deletedStudent === null) {
      return next(handleErrorConstructor(404, 'Студент не найден'));
    }
    res.send({deletedStudent: deletedStudent});
  } catch {
    return next(handleErrorConstructor(500, err.message));
  }
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
}

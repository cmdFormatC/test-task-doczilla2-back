require('dotenv').config();
const { Pool } = require('pg');

const { handleErrorConstructor } = require('./handleErrorTools');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

const getStudentsFromDb = async (limit, offset = 0) => {
  try {
    let queryText = 'SELECT * FROM students ORDER BY id ASC';
    const queryParams = [];
    if (limit !== undefined && limit !== null) {
      queryText += ' LIMIT $1 OFFSET $2';
      queryParams.push(limit, offset);
    }
    const result = await pool.query(queryText, queryParams);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const pushStudent = async (item) => {
  try {
    const { fullName, dob, group } = item;
    const queryText = 
    'INSERT INTO students(fullname, dob, educationgroup) VALUES($1, $2, $3) RETURNING *';
    const queryParams = [fullName, dob, group];
    const result = await pool.query(queryText, queryParams);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const deleteStudentFromDb = async (id) => {
  try {
    const queryText = 'DELETE FROM students WHERE id = $1 RETURNING *';
    const queryParams = [id];
    const result = await pool.query(queryText, queryParams);
    if (result.rows.length) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getStudentsFromDb,
  pushStudent,
  deleteStudentFromDb,
}
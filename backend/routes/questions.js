const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { parseJwt } = require("../utils/jwtGenerator");

router.post("/set", authorize, async (req, res) => {
  try {
    let questions = req.body;

    // const tokenInfo = parseJwt(userInfo.jwtToken);

    let drop = await pool.query("DROP TABLE IF EXISTS questions");

    let create = await pool.query(
      "CREATE TABLE questions(question_id SERIAL,question TEXT NOT NULL,optiona VARCHAR(255) NOT NULL,optionb VARCHAR(255) NOT NULL,optionc VARCHAR(255) NOT NULL,optiond VARCHAR(255) NOT NULL,answer VARCHAR(255) NOT NULL,PRIMARY KEY (question_id))"
    );

    questions.forEach(async (question) => {
      let result = await pool.query(
        "INSERT INTO questions (question, optiona, optionb, optionc, optiond, answer) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          question.question,
          question.optiona,
          question.optionb,
          question.optionc,
          question.optiond,
          question.answer,
        ]
      );
    });

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json({ message: "Questions set Successfully! " });
    // console.log("result.rows[0]", result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get", authorize, async (req, res) => {
  try {
    const questions = await pool.query("SELECT * FROM questions");

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json(questions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get/:id", authorize, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM results WHERE user_id = $1", [
      req.params.id,
    ]);

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

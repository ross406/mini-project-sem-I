const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { parseJwt } = require("../utils/jwtGenerator");

router.post("/set", authorize, async (req, res) => {
  try {
    const {
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers,
      userInfo,
    } = req.body;
    const tokenInfo = parseJwt(userInfo.jwtToken);

    let result = await pool.query(
      "INSERT INTO results (user_id, total_questions, attempted_questions, correct_answers, wrong_answers) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        tokenInfo.user.id,
        numberOfQuestions,
        numberOfAnsweredQuestions,
        correctAnswers,
        wrongAnswers,
      ]
    );

    //if would be req.user if you change your payload to this:

    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };

    res.json(result.rows[0]);
    console.log("result.rows[0]", result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get", authorize, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");

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

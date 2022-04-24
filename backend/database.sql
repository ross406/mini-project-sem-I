CREATE DATABASE jwttutorial;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE results(
  result_id SERIAL,
  user_id UUID ,
  total_questions INTEGER,
  attempted_questions INTEGER,
  correct_answers INTEGER,
  wrong_answers INTEGER,
  PRIMARY KEY (result_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

INSERT INTO results (user_id, total_questions, attempted_questions, correct_answers, wrong_answers) 
VALUES ('06d297df-d21b-47cc-b8bd-3e2201a9b606',15, 11, 5, 6);


-- SELECT * FROM results JOIN user_id on results.user_id = users.user_id;
import axios from "axios";
import { useState } from "react";
import Header from "../header/Header";
import styles from "./quizmaker.module.css";

export default function Quizmaker() {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      gif: null,
    },
  ]);

  const [quizDescriptions, setQuizdescription] = useState([
    [
      {
        quizname: "",
        quizdescription: "",
        madeby: "",
        difficultylevel: "",
        slides: "",
        database: "",
        bgimg: "",
      },
    ],
  ]);

  const [quizname, setQuizName] = useState("");

  function handleQuestionChange(index, value) {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  }

  function handleOptionChange(qIndex, oIndex, value) {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  }

  function handleCorrectAnswerChange(qIndex, value) {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  }

  // Handle GIF file change
  const handleGifChange = (qIndex, file) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].gif = file;
    setQuestions(newQuestions);
  };

  function addQuestion() {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        gif: null,
      },
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setQuizdescription([{ ...quizDescriptions[0], quizname: quizname }]);
    setQuizdescription([{ ...quizDescriptions[0], database: quizname }]);

    // const url = "http://localhost/Quizappdatabase/uploaddb.php";
    // const formData = new FormData();

    // formData.append("quizname", quizname);
    // formData.append(
    //   "questions",
    //   JSON.stringify(
    //     questions.map((q) => ({
    //       question: q.question,
    //       options: q.options,
    //       correctAnswer: q.correctAnswer,
    //     }))
    //   )
    // );

    // questions.forEach((question) => {
    //   if (question.gif) {
    //     formData.append(`gifs[]`, question.gif);
    //   }
    // });

    // axios
    //   .post(url, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((response) => {
    //     console.log("Quiz saved successfully", response);
    //   })
    //   .catch((error) => {
    //     console.log("Oops Error!", error);
    //   });
  }
  return (
    <>
      <Header />
      <div>
        <input
          placeholder="Set Quiz Name"
          type="text"
          value={quizname}
          onChange={(e) => setQuizName(e.target.value)}
          required
        />
        <form onSubmit={handleSubmit}>
          <div className={styles.quizdescriptioncontainer}>
            <input
              type="text"
              name="quizdesc"
              placeholder="Give a brief Description"
              onChange={(e) =>
                setQuizdescription([
                  { ...quizDescriptions[0], quizdesc: e.target.value },
                ])
              }
            />
            <br />
            <label htmlFor="quizcreator">Name Of Creator</label>
            <input
              onChange={(e) =>
                setQuizdescription([
                  { ...quizDescriptions[0], madeby: e.target.value },
                ])
              }
              placeholder="Name"
              type="text"
              name="quizcreator"
            />

            <label htmlFor="difficulty">Difficulty Level</label>
            <input
              onChange={(e) =>
                setQuizdescription([
                  { ...quizDescriptions[0], difficultylevel: e.target.value },
                ])
              }
              type="text"
              placeholder="Easy/Medium/Hard"
            />
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex}>
              <input
                placeholder={`Question ${qIndex + 1}`}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                value={question.question}
                type="text"
                required
              />
              {question.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  value={option}
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  required
                />
              ))}
              <input
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
                type="text"
                value={question.correctAnswer}
                placeholder={`Correct Answer`}
              />
              <input
                type="file"
                accept="image/gif"
                onChange={(e) => handleGifChange(qIndex, e.target.files[0])}
              />
            </div>
          ))}
          <button type="button" onClick={addQuestion}>
            Add Another Question
          </button>
          <button type="submit">Save Quiz</button>
          <button
            onClick={() => console.log(quizDescriptions[0])}
            type="button"
          >
            Log Array
          </button>
        </form>
      </div>
    </>
  );
}

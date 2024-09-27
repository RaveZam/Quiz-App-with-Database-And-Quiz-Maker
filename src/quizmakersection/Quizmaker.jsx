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
      gif: "",
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

  const handleThumbnailChange = (file) => {
    setQuizdescription([{ ...quizDescriptions[0], bgimg: file }]);
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

    const url = "http://localhost/Quizappdatabase/uploaddb.php";
    const formData = new FormData();

    formData.append("quizname", quizname);
    formData.append(
      "quizDescriptions",
      JSON.stringify(
        quizDescriptions.map((d) => ({
          quizname: d.quizname,
          quizdescription: d.quizdescription,
          madeby: d.madeby,
          difficultylevel: d.difficultylevel,
          slides: questions.length,
          database: d.database,
        }))
      )
    );

    if (quizDescriptions[0].bgimg) {
      formData.append("bgimg", quizDescriptions[0].bgimg);
    }

    formData.append(
      "questions",
      JSON.stringify(
        questions.map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
        }))
      )
    );

    questions.forEach((question) => {
      if (question.gif) {
        formData.append(`gifs[]`, question.gif);
      }
    });

    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Quiz saved successfully", response.data.status);
      })
      .catch((error) => {
        console.log("Oops Error!", error);
      });
  }
  return (
    <>
      <Header />
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.quizdescriptioncontainer}>
            <input
              placeholder="Set Quiz Name"
              type="text"
              value={quizname}
              onChange={(e) =>
                setQuizName(e.target.value) &
                setQuizdescription([
                  {
                    ...quizDescriptions[0],
                    quizname: e.target.value,
                    database: e.target.value,
                  },
                ])
              }
              required
            />
            <input
              type="text"
              name="quizdesc"
              placeholder="Give a brief Description"
              onChange={(e) =>
                setQuizdescription([
                  { ...quizDescriptions[0], quizdescription: e.target.value },
                ])
              }
            />
            <br />
            <label htmlFor="quizcreator">Name Of Creator</label>
            <input
              type="text"
              placeholder="Name"
              name="quizcreator"
              onChange={(e) =>
                setQuizdescription([
                  { ...quizDescriptions[0], madeby: e.target.value },
                ])
              }
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
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={(e) => handleThumbnailChange(e.target.files[0])}
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
            onClick={() => console.log(quizDescriptions[0].bgimg)}
            type="button"
          >
            Log Array
          </button>
        </form>
      </div>
    </>
  );
}

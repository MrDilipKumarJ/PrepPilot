import { useState } from "react";
import { useInterview } from "../context/InterviewContext";

const questions = [
  {
    id: 1,
    category: "React",
    question:
      "What is the difference between useState and useEffect?",
  },
  {
    id: 2,
    category: "JavaScript",
    question:
      "What is the difference between let, const, and var?",
  },
  {
    id: 3,
    category: "HR",
    question:
      "Tell me about yourself.",
  },
  {
    id: 4,
    category: "Projects",
    question:
      "Explain one of your projects and your contribution to it.",
  },
  {
    id: 5,
    category: "SQL",
    question:
      "What is the difference between INNER JOIN and LEFT JOIN?",
  },
];

function MockInterview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  // Get shared context function
  const { addResults } = useInterview();

  const question = questions[currentQuestion];

  const handleNext = () => {
    // Check answer
    if (!answer.trim() || !score) {
      alert(
        "Please write your answer and select a score."
      );
      return;
    }

    // Create result for current question
    const result = {
      question: question.question,
      category: question.category,
      score: Number(score),
    };

    // Create complete results array
    const updatedResults = [
      ...results,
      result,
    ];

    // Save locally
    setResults(updatedResults);

    // If this is the last question
    if (
      currentQuestion ===
      questions.length - 1
    ) {
      // SAVE RESULTS TO GLOBAL CONTEXT
      addResults(updatedResults);

      setFinished(true);
    } else {
      // Move to next question
      setCurrentQuestion(
        (previous) => previous + 1
      );

      setAnswer("");
      setScore("");
    }
  };

  const restartInterview = () => {
    setCurrentQuestion(0);
    setAnswer("");
    setScore("");
    setResults([]);
    setFinished(false);
  };

  // =========================
  // RESULT SCREEN
  // =========================

  if (finished) {
    const totalScore = results.reduce(
      (total, result) =>
        total + result.score,
      0
    );

    const maximumScore =
      questions.length * 5;

    const percentage = Math.round(
      (totalScore / maximumScore) * 100
    );

    return (
      <div className="app-layout">
        <main className="main-content">

          <div className="dashboard-header">
            <div>
              <h1>
                Interview Complete 🎉
              </h1>

              <p>
                Here's how you performed
                in this mock interview.
              </p>
            </div>
          </div>

          <div className="mock-result-card">

            <div className="final-score">

              <span>
                Overall Score
              </span>

              <strong>
                {percentage}%
              </strong>

            </div>

            <div className="result-list">

              {results.map(
                (result, index) => (

                  <div
                    className="result-item"
                    key={index}
                  >

                    <div>

                      <strong>
                        {result.category}
                      </strong>

                      <p>
                        {result.question}
                      </p>

                    </div>

                    <span>
                      {result.score}/5
                    </span>

                  </div>

                )
              )}

            </div>

            <button
              className="add-button"
              onClick={
                restartInterview
              }
            >
              Practice Again
            </button>

          </div>

        </main>
      </div>
    );
  }

  // =========================
  // INTERVIEW SCREEN
  // =========================

  return (
    <div className="app-layout">
      <main className="main-content">

        <div className="dashboard-header">

          <div>

            <h1>
              Mock Interview 🎤
            </h1>

            <p>
              Practice answering common
              interview questions.
            </p>

          </div>

          <div className="question-progress">
            Question{" "}
            {currentQuestion + 1} of{" "}
            {questions.length}
          </div>

        </div>

        <div className="mock-interview-card">

          <div className="question-category">
            {question.category}
          </div>

          <h2>
            {question.question}
          </h2>

          <label>
            Your Answer
          </label>

          <textarea
            value={answer}
            onChange={(event) =>
              setAnswer(event.target.value)
            }
            placeholder="Type your answer here..."
            rows="8"
          />

          <div className="self-rating">

            <label>
              How confident are you
              with your answer?
            </label>

            <div className="rating-buttons">

              {[1, 2, 3, 4, 5].map(
                (value) => (

                  <button
                    key={value}
                    className={
                      Number(score) === value
                        ? "selected-rating"
                        : ""
                    }
                    onClick={() =>
                      setScore(value)
                    }
                  >
                    {value}
                  </button>

                )
              )}

            </div>

            <div className="rating-labels">

              <span>
                Not confident
              </span>

              <span>
                Very confident
              </span>

            </div>

          </div>

          <button
            className="next-question-button"
            onClick={handleNext}
          >
            {currentQuestion ===
            questions.length - 1
              ? "Finish Interview"
              : "Next Question →"}
          </button>

        </div>

      </main>
    </div>
  );
}

export default MockInterview;
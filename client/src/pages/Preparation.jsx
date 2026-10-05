import { useState } from "react";

function Preparation() {
  const [topics, setTopics] = useState([
    {
      id: 1,
      category: "React",
      icon: "⚛️",
      description:
        "Practice React concepts commonly asked in frontend interviews.",
      progress: 70,
      topics: [
        "Components",
        "Props",
        "useState",
        "useEffect",
        "React Router",
      ],
    },
    {
      id: 2,
      category: "JavaScript",
      icon: "🟨",
      description:
        "Strengthen your JavaScript fundamentals and problem-solving skills.",
      progress: 55,
      topics: [
        "Variables",
        "Functions",
        "Arrays",
        "Objects",
        "Promises",
      ],
    },
    {
      id: 3,
      category: "SQL",
      icon: "🗄️",
      description:
        "Prepare for database and SQL interview questions.",
      progress: 45,
      topics: [
        "SELECT",
        "WHERE",
        "JOINs",
        "GROUP BY",
        "Subqueries",
      ],
    },
    {
      id: 4,
      category: "Data Structures",
      icon: "🧩",
      description:
        "Build confidence with common data structures and algorithms.",
      progress: 30,
      topics: [
        "Arrays",
        "Strings",
        "Linked Lists",
        "Stacks",
        "Queues",
      ],
    },
    {
      id: 5,
      category: "HR & Behavioral",
      icon: "💬",
      description:
        "Practice communication and behavioral interview questions.",
      progress: 80,
      topics: [
        "Tell me about yourself",
        "Strengths",
        "Weaknesses",
        "Teamwork",
        "Career goals",
      ],
    },
    {
      id: 6,
      category: "Projects",
      icon: "🚀",
      description:
        "Prepare to confidently explain your projects and contributions.",
      progress: 60,
      topics: [
        "Project Overview",
        "Your Contribution",
        "Technologies",
        "Challenges",
        "Future Improvements",
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [expandedTopic, setExpandedTopic] =
    useState(null);

  const handleProgress = (id) => {
    setTopics((previousTopics) =>
      previousTopics.map((topic) =>
        topic.id === id
          ? {
              ...topic,
              progress:
                topic.progress >= 100
                  ? 0
                  : topic.progress + 10,
            }
          : topic
      )
    );
  };

  const filteredTopics =
    selectedCategory === "All"
      ? topics
      : topics.filter(
          (topic) =>
            topic.category === selectedCategory
        );

  const overallProgress = Math.round(
    topics.reduce(
      (total, topic) =>
        total + topic.progress,
      0
    ) / topics.length
  );

  return (
    <div className="preparation-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>
            Preparation 📚
          </h1>

          <p>
            Build your interview skills
            one topic at a time.
          </p>
        </div>

        <div className="preparation-score">
          <span>Overall Progress</span>

          <strong>
            {overallProgress}%
          </strong>
        </div>

      </div>


      {/* OVERALL PROGRESS */}

      <section className="content-section">

        <div className="section-header">
          <h2>
            🚀 Your Preparation
          </h2>

          <span>
            {overallProgress}% Complete
          </span>
        </div>

        <div className="large-progress-bar">

          <div
            style={{
              width: `${overallProgress}%`,
            }}
          ></div>

        </div>

        <p className="progress-message">

          {overallProgress < 40
            ? "Just getting started. Keep building your foundation!"
            : overallProgress < 70
            ? "Good progress! Keep practicing consistently."
            : overallProgress < 90
            ? "You're getting close to interview ready!"
            : "Excellent! You're highly prepared. 🚀"}

        </p>

      </section>


      {/* CATEGORY FILTER */}

      <section className="content-section">

        <div className="section-header">

          <h2>
            Preparation Areas
          </h2>

        </div>

        <div className="filter-buttons">

          {[
            "All",
            "React",
            "JavaScript",
            "SQL",
            "Data Structures",
            "HR & Behavioral",
            "Projects",
          ].map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

      </section>


      {/* TOPIC CARDS */}

      <section className="preparation-grid">

        {filteredTopics.map((topic) => {

          const isExpanded =
            expandedTopic === topic.id;

          return (

            <div
              className="preparation-card"
              key={topic.id}
            >

              <div className="preparation-card-header">

                <div className="preparation-icon">
                  {topic.icon}
                </div>

                <div>

                  <h2>
                    {topic.category}
                  </h2>

                  <p>
                    {topic.description}
                  </p>

                </div>

              </div>


              {/* PROGRESS */}

              <div className="topic-progress">

                <div className="topic-progress-info">

                  <span>
                    Progress
                  </span>

                  <strong>
                    {topic.progress}%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    style={{
                      width:
                        `${topic.progress}%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* EXPAND BUTTON */}

              <button
                className="topic-toggle"
                onClick={() =>
                  setExpandedTopic(
                    isExpanded
                      ? null
                      : topic.id
                  )
                }
              >
                {isExpanded
                  ? "Hide Topics ↑"
                  : "View Topics →"}
              </button>


              {/* TOPICS */}

              {isExpanded && (

                <div className="topic-list">

                  <h3>
                    Topics to Practice
                  </h3>

                  {topic.topics.map(
                    (item, index) => (

                      <div
                        className="topic-item"
                        key={index}
                      >

                        <span>
                          ✓
                        </span>

                        <p>
                          {item}
                        </p>

                      </div>

                    )
                  )}

                  <button
                    className="mark-progress-button"
                    onClick={() =>
                      handleProgress(
                        topic.id
                      )
                    }
                  >
                    + Mark Progress
                  </button>

                </div>

              )}

            </div>

          );

        })}

      </section>


      {/* STUDY TIPS */}

      <section className="content-section">

        <div className="section-header">

          <h2>
            💡 Preparation Tips
          </h2>

        </div>

        <div className="tips-grid">

          <div className="tip-card">

            <span>01</span>

            <h3>
              Practice Daily
            </h3>

            <p>
              Spend at least 30 minutes
              every day reviewing interview
              concepts.
            </p>

          </div>


          <div className="tip-card">

            <span>02</span>

            <h3>
              Practice Out Loud
            </h3>

            <p>
              Speaking your answers helps
              improve confidence and
              communication.
            </p>

          </div>


          <div className="tip-card">

            <span>03</span>

            <h3>
              Review Weak Areas
            </h3>

            <p>
              Use the Weakness Detector
              to focus your preparation
              where it matters most.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Preparation;
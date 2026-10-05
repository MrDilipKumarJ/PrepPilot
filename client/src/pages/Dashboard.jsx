import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { useInterview } from "../context/InterviewContext";

function Dashboard() {

  const { results } = useInterview();

  const [readiness, setReadiness] = useState(0);

  const [categoryScores, setCategoryScores] =
    useState([]);

  const [weakestArea, setWeakestArea] =
    useState("None yet");


  /* =========================================
     CALCULATE READINESS
     ========================================= */

  useEffect(() => {

    if (results.length === 0) {

      setReadiness(0);

      setCategoryScores([]);

      setWeakestArea("None yet");

      return;
    }


    const categories = {};


    results.forEach((result) => {

      if (!categories[result.category]) {

        categories[result.category] = {
          total: 0,
          count: 0,
        };

      }


      categories[result.category].total +=
        result.score;

      categories[result.category].count += 1;

    });


    const scores =
      Object.entries(categories).map(
        ([category, data]) => ({

          category,

          average:
            data.total / data.count,

        })
      );


    setCategoryScores(scores);


    const totalScore =
      results.reduce(
        (total, result) =>
          total + result.score,
        0
      );


    const maximumScore =
      results.length * 5;


    const calculatedReadiness =
      Math.round(
        (totalScore / maximumScore) * 100
      );


    setReadiness(
      calculatedReadiness
    );


    const weakest =
      [...scores].sort(
        (a, b) =>
          a.average - b.average
      )[0];


    if (weakest) {

      setWeakestArea(
        weakest.category
      );

    }

  }, [results]);


  /* =========================================
     READINESS MESSAGE
     ========================================= */

  const getReadinessMessage = () => {

    if (readiness === 0) {

      return (
        "Complete a mock interview to calculate your readiness."
      );

    }

    if (readiness < 50) {

      return (
        "Keep practicing. You have some areas to improve."
      );

    }

    if (readiness < 70) {

      return (
        "You're making progress. Keep practicing!"
      );

    }

    if (readiness < 85) {

      return (
        "You're almost ready for your next interview!"
      );

    }

    return (
      "Excellent preparation. You're interview ready!"
    );

  };


  return (

    <div className="dashboard-page">


      {/* =====================================
          HERO
          ===================================== */}

      <section className="hero-panel watercolor-fill">

        <div className="hero-decoration hero-line-one"></div>

        <div className="hero-decoration hero-line-two"></div>

        <div className="hero-decoration hero-circle"></div>


        <div className="hero-sketch-left">
          ╱╲
        </div>


        <div className="hero-sketch-right">
          ╲╱
        </div>


        <div className="hero-content">

          <span className="hero-small-text">
            PREPPILOT • INTERVIEW PREPARATION
          </span>


          <h1 className="font-sketch-heading">

            READY FOR YOUR
            <br />
            NEXT INTERVIEW?

          </h1>


          <p className="font-handwriting">

            Start out by analyzing
            your interview preparation
            and building your confidence.

          </p>


          <span className="hero-sparkle sparkle-icon">
            ✦
          </span>

        </div>

      </section>


      {/* =====================================
          STATISTICS
          ===================================== */}

      <section className="dashboard-stats">


        <StatCard
          title="Applications"
          value="12"
          icon="▤"
          description="+2 this week"
        />


        <StatCard
          title="Interviews"
          value="4"
          icon="⌕"
          description="2 upcoming"
        />


        <StatCard
          title="Readiness"
          value={`${readiness}%`}
          icon="◎"
          description={
            results.length > 0
              ? "Based on mock interviews"
              : "Start practicing"
          }
        />


        <StatCard
          title="Practice Hours"
          value="18h"
          icon="◷"
          description="+3h this week"
        />

      </section>


      {/* =====================================
          READINESS
          ===================================== */}

      <section className="dashboard-section sketch-border-sm">

        <div className="dashboard-section-title">

          <div>

            <span className="section-eyebrow">
              PERFORMANCE
            </span>

            <h2 className="font-sketch-heading">
              Interview Readiness
            </h2>

          </div>


          <span className="section-number">
            01
          </span>

        </div>


        <div className="readiness-card">


          <div className="readiness-score watercolor-fill">

            <span>
              CURRENT SCORE
            </span>

            <strong>
              {readiness}%
            </strong>

            <span className="score-doodle">
              ✦
            </span>

          </div>


          <div className="readiness-details">

            <p className="font-handwriting">
              {getReadinessMessage()}
            </p>


            {categoryScores.length === 0 ? (

              <div className="empty-dashboard-message sketch-border-sm">

                🎤 Complete your first mock
                interview to generate
                your readiness analysis.

              </div>

            ) : (

              <div className="category-progress">

                {categoryScores.map(
                  (item) => {

                    const percentage =
                      (item.average / 5) *
                      100;


                    return (

                      <div
                        className="category-row"
                        key={item.category}
                      >

                        <div className="category-row-top">

                          <span>
                            {item.category}
                          </span>

                          <strong>
                            {item.average.toFixed(1)}
                            /5
                          </strong>

                        </div>


                        <div className="sketch-progress-bg">

                          <div
                            className="sketch-progress-fill"
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================
          FOCUS AREA
          ===================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-title">

          <div>

            <span className="section-eyebrow">
              ANALYSIS
            </span>

            <h2 className="font-sketch-heading">
              Focus Area
            </h2>

          </div>


          <span className="section-number">
            02
          </span>

        </div>


        {results.length === 0 ? (

          <div className="focus-empty watercolor-fill">

            <span className="sparkle-icon">
              ✦
            </span>


            <div>

              <h3>
                Your weakness detector
                is waiting.
              </h3>


              <p className="font-handwriting">

                Complete a mock interview
                and PrepPilot will identify
                the area that needs the
                most attention.

              </p>

            </div>

          </div>

        ) : (

          <div className="focus-card watercolor-fill">

            <div className="focus-icon">
              !
            </div>


            <div>

              <span>
                NEEDS PRACTICE
              </span>


              <h3>
                {weakestArea}
              </h3>


              <p>
                This is currently your
                weakest interview category.
              </p>

            </div>

          </div>

        )}

      </section>


      {/* =====================================
          UPCOMING INTERVIEWS
          ===================================== */}

      <section className="dashboard-section">

        <div className="dashboard-section-title">

          <div>

            <span className="section-eyebrow">
              SCHEDULE
            </span>

            <h2 className="font-sketch-heading">
              Upcoming Interviews
            </h2>

          </div>


          <span className="section-number">
            03
          </span>

        </div>


        <div className="upcoming-list">


          <div className="upcoming-card sketch-border-sm">

            <div className="upcoming-company google">
              G
            </div>


            <div className="upcoming-info">

              <h3>
                Google
              </h3>

              <p>
                Frontend Developer
                <span>•</span>
                Technical Round
              </p>

            </div>


            <div className="upcoming-time">

              <strong>
                Tomorrow
              </strong>

              <span>
                10:00 AM
              </span>

            </div>

          </div>


          <div className="upcoming-card sketch-border-sm">

            <div className="upcoming-company tcs">
              T
            </div>


            <div className="upcoming-info">

              <h3>
                TCS
              </h3>

              <p>
                Software Engineer
                <span>•</span>
                HR Round
              </p>

            </div>


            <div className="upcoming-time">

              <strong>
                Oct 12
              </strong>

              <span>
                2:30 PM
              </span>

            </div>

          </div>


        </div>

      </section>

    </div>

  );
}

export default Dashboard;
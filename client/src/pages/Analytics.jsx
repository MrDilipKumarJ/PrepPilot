import { useInterview } from "../context/InterviewContext";

function Analytics() {
  const { results } = useInterview();

  // Calculate category performance
  const categories = {};

  results.forEach((result) => {
    if (!categories[result.category]) {
      categories[result.category] = {
        total: 0,
        count: 0,
      };
    }

    categories[result.category].total += result.score;
    categories[result.category].count += 1;
  });

  const categoryScores = Object.entries(categories).map(
    ([category, data]) => ({
      category,
      average: data.total / data.count,
    })
  );

  // Detect weak areas
  const weakAreas = categoryScores.filter(
    (item) => item.average <= 2.5
  );

  return (
    <div className="app-layout">
      <main className="main-content">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Interview Analytics 📊</h1>
            <p>
              Understand your strengths and weaknesses.
            </p>
          </div>
        </div>

        {/* No data */}
        {results.length === 0 ? (
          <div className="mock-result-card">
            <h2>No interview data yet</h2>

            <p>
              Complete a mock interview first to see
              your performance analytics.
            </p>
          </div>
        ) : (
          <>
            {/* Performance */}
            <section className="content-section">

              <div className="section-header">
                <h2>Performance by Category</h2>
              </div>

              <div className="analytics-grid">

                {categoryScores.map((item) => {
                  const percentage =
                    (item.average / 5) * 100;

                  return (
                    <div
                      className="analytics-card"
                      key={item.category}
                    >

                      <div className="analytics-card-header">

                        <h3>
                          {item.category}
                        </h3>

                        <strong>
                          {item.average.toFixed(1)}/5
                        </strong>

                      </div>

                      <div className="progress-bar">

                        <div
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </section>

            {/* Weakness Detector */}
            <section className="content-section">

              <div className="section-header">
                <h2>⚠️ Weakness Detector</h2>
              </div>

              {weakAreas.length === 0 ? (

                <div className="success-card">
                  🎉 No major weaknesses detected.
                  Keep practicing!
                </div>

              ) : (

                <div className="weakness-list">

                  {weakAreas.map((area) => (

                    <div
                      className="weakness-card"
                      key={area.category}
                    >

                      <div>

                        <h3>
                          {area.category}
                        </h3>

                        <p>
                          Average score:{" "}
                          {area.average.toFixed(1)}/5
                        </p>

                      </div>

                      <span>
                        Needs Practice
                      </span>

                    </div>

                  ))}

                </div>

              )}

            </section>

          </>
        )}

      </main>
    </div>
  );
}

export default Analytics;
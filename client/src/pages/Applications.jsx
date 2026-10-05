import { useState } from "react";

function Applications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      date: "Oct 2, 2026",
      status: "Interview",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineer",
      date: "Sep 28, 2026",
      status: "Applied",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Data Analyst",
      date: "Sep 20, 2026",
      status: "Rejected",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    date: "",
    status: "Applied",
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add new application
  const handleSubmit = (event) => {
    event.preventDefault();

    const newApplication = {
      id: Date.now(),
      ...formData,
    };

    setApplications((previous) => [
      newApplication,
      ...previous,
    ]);

    setFormData({
      company: "",
      role: "",
      date: "",
      status: "Applied",
    });

    setShowForm(false);
  };

  // Delete application
  const handleDelete = (id) => {
    setApplications((previous) =>
      previous.filter(
        (application) => application.id !== id
      )
    );
  };

  // Filter applications
  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter(
          (application) =>
            application.status === filter
        );

  return (
    <div className="app-layout">
      <main className="main-content">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Applications</h1>

            <p>
              Track your job applications and
              interview progress.
            </p>
          </div>

          <button
            className="add-button"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            + Add Application
          </button>
        </div>

        {/* Add Application Form */}
        {showForm && (
          <form
            className="application-form"
            onSubmit={handleSubmit}
          >
            <h2>Add New Application</h2>

            <div className="form-grid">

              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="role"
                placeholder="Job role"
                value={formData.role}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Selected">
                  Selected
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

            </div>

            <div className="form-actions">

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button type="submit">
                Save Application
              </button>

            </div>
          </form>
        )}

        {/* Applications */}
        <section className="applications-section">

          <div className="section-header">

            <h2>My Applications</h2>

            <span className="application-count">
              {applications.length} Applications
            </span>

          </div>

          {/* Filters */}
          <div className="filter-buttons">

            {[
              "All",
              "Applied",
              "Interview",
              "Selected",
              "Rejected",
            ].map((status) => (

              <button
                key={status}
                className={
                  filter === status
                    ? "active-filter"
                    : ""
                }
                onClick={() =>
                  setFilter(status)
                }
              >
                {status}
              </button>

            ))}

          </div>

          {/* Application List */}
          <div className="applications-list">

            {filteredApplications.length === 0 ? (

              <div className="empty-state">
                <h3>No applications found</h3>

                <p>
                  There are no applications with
                  this status.
                </p>
              </div>

            ) : (

              filteredApplications.map(
                (application) => (

                  <div
                    className="application-card"
                    key={application.id}
                  >

                    {/* Company Icon */}
                    <div className="company-icon">
                      {application.company.charAt(0)}
                    </div>

                    {/* Application Info */}
                    <div className="application-info">

                      <h3>
                        {application.company}
                      </h3>

                      <p>
                        {application.role}
                      </p>

                      <span>
                        Applied on{" "}
                        {application.date}
                      </span>

                    </div>

                    {/* Status */}
                    <div className="application-status">

                      <span
                        className={`status ${application.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {application.status}
                      </span>

                    </div>

                    {/* Delete */}
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          application.id
                        )
                      }
                      title="Delete application"
                    >
                      🗑️
                    </button>

                  </div>

                )
              )

            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Applications;
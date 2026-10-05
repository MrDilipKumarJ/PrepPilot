import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <header className="top-navbar">

      <NavLink
        to="/dashboard"
        className="brand"
      >
        <img
          src="/preppilot-logo.png"
          alt="PrepPilot"
          className="preppilot-logo"
        />
      </NavLink>

      <nav className="top-nav">

        <NavLink to="/dashboard">
          DASHBOARD
        </NavLink>

        <NavLink to="/applications">
          APPLICATIONS
        </NavLink>

        <NavLink to="/preparation">
          PREPARATION
        </NavLink>

        <NavLink to="/mock-interview">
          MOCK INTERVIEW
        </NavLink>

        <NavLink to="/analytics">
          ANALYTICS
        </NavLink>

      </nav>

      <NavLink
        to="/profile"
        className="profile-circle"
      >
        JD
      </NavLink>

    </header>
  );
}

export default Sidebar;
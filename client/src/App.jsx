import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Preparation from "./pages/Preparation";
import MockInterview from "./pages/MockInterview";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";

import { InterviewProvider } from "./context/InterviewContext";

function App() {
  return (
    <BrowserRouter>
      <InterviewProvider>

        <Layout>

          <Routes>

            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/preparation"
              element={<Preparation />}
            />

            <Route
              path="/mock-interview"
              element={<MockInterview />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>

        </Layout>

      </InterviewProvider>
    </BrowserRouter>
  );
}

export default App;
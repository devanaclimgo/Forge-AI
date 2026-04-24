import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/page";
import SignupPage from "./pages/signup/page";
import LoginPage from "./pages/login/page";
import DashboardPage from "./pages/dashboard/page";
import ProjectPage from "./pages/projects/id/page";
import AgentsPage from "./pages/agents/page";
import BrainDumpPage from "./pages/brain-dump/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/brain-dump" element={<BrainDumpPage />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/page";
import SignupPage from "./pages/signup/page";
import LoginPage from "./pages/login/page";
import DashboardPage from "./pages/dashboard/page";
import ProjectPage from "./pages/project/id/page";
import AgentsPage from "./pages/agents/page";
import BrainDumpPage from "./pages/brain-dump/page";
import ProjectsPage from "./pages/projects/page";
import SettingsPage from "./pages/settings/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/brain-dump" element={<BrainDumpPage />} />
    </Routes>
  );
}

export default App;

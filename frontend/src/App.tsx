import { Routes, Route } from "react-router-dom";
import AgentPage from "./pages/AgentPage";
import BrainDumpPage from "./pages/BrainDumpPage";
import ProjectPage from "./pages/ProjectPage";
import CommunityPage from "./pages/CommunityPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/agents" element={<AgentPage />} />
      <Route path="/brain-dump" element={<BrainDumpPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/community" element={<CommunityPage />} />
    </Routes>
  );
}

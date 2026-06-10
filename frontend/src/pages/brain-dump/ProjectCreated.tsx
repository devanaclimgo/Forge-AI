import type { Project } from "../../../src/types/project";

export interface ProjectCreatedProps {
  project: Project | null;
  onViewProject: () => void;
}
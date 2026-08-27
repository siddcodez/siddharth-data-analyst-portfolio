import { ReactNode } from "react";

export type Project = {
  title: string;
  src: string;
  category: string;
  skills: {
    frontend: any[];
    backend: any[];
  };
  content: ReactNode;
  github?: string;
  live: string;
  screenshots: string[];
};

const projects: Project[] = [];

export default projects;

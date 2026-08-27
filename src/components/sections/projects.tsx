"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { config } from "@/data/config";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:h-[100vh] flex flex-col justify-center">
      <SectionHeader id="projects" title="Projects" />
      <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-6 rounded-2xl border-[.5px] border-border bg-secondary/30 backdrop-blur-sm max-w-2xl mx-auto my-8">
        <div className="text-4xl mb-1">🚧</div>
        <h3 className="text-2xl md:text-3xl font-semibold font-display">
          Projects Coming Soon
        </h3>
        <p className="text-muted-foreground max-w-md text-sm md:text-base">
          I&apos;m currently building my first Data Analytics &amp; Data Science projects.
          Check back soon, or follow my journey on GitHub!
        </p>
        {config.social.github && (
          <Link href={config.social.github} target="_blank">
            <Button variant="outline" className="mt-2 flex items-center gap-2">
              <SiGithub className="w-4 h-4" />
              <span>Explore GitHub</span>
            </Button>
          </Link>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;

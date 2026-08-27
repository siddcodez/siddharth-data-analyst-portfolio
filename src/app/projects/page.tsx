"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { config } from "@/data/config";

function Page() {
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-foreground min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20">
      <h1 className="text-4xl mb-6 font-display">Projects</h1>
      <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-6 rounded-2xl border-[.5px] border-border bg-secondary/30 backdrop-blur-sm max-w-2xl w-full">
        <div className="text-5xl mb-2">🚧</div>
        <h2 className="text-2xl md:text-3xl font-semibold font-display">
          Projects Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-md text-sm md:text-base">
          I&apos;m currently working on exciting Data Analytics and Data Science projects.
          Check back soon to explore my dashboards, exploratory data analysis, and predictive models.
        </p>
        {config.social.github && (
          <Link href={config.social.github} target="_blank">
            <Button variant="outline" className="mt-4 flex items-center gap-2">
              <SiGithub className="w-4 h-4" />
              <span>Explore My GitHub</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Page;

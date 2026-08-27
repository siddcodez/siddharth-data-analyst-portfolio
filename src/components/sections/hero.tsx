import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper
      id="hero"
      className={cn(
        "relative w-full min-h-[100svh]"
      )}
    >
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "hero-content",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            // Restored pt-28 baseline for mobile portrait, with short-screen/landscape safety
            "pt-28 landscape:pt-16 max-h-[600px]:pt-16 sm:pb-16 md:p-20 lg:p-24 xl:p-28",
            "px-5 sm:px-8 md:px-0"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col w-full max-w-full">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-muted-foreground",
                      "cursor-default font-display sm:text-xl md:text-xl bg-clip-text"
                    )}
                  >
                    Hi, I am
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "-ml-[6px] leading-none font-thin text-transparent text-foreground/10 text-left",
                          "font-thin text-6xl max-[340px]:text-[3.5rem] sm:text-7xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl",
                          "cursor-default text-edge-outline font-display",
                          "break-normal"
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <br />
                        {config.author.split(" ")[1]}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-accent text-accent-foreground"
                    >
                      theres something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-thin text-md text-muted-foreground",
                      "cursor-default font-display sm:text-xl md:text-xl bg-clip-text"
                    )}
                  >
                    Aspiring Data Analyst
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
                <Link
                  href={"#"}
                  className="flex-1 cursor-default"
                >
                  <BoxReveal delay={2} width="100%" >
                    <Button className="flex items-center gap-2 w-full" variant="secondary">
                      <File size={24} />
                      <p>Resume (Coming Soon)</p>
                    </Button>
                  </BoxReveal>
                </Link>
                {/* Button row: flex-wrap ensures social icons wrap cleanly on narrow screens */}
                <div className="md:self-start flex flex-wrap gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden min-w-[80px]"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Let&apos;s connect! 👋</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center h-full gap-2">
                    {config.social.twitter && (
                      <Link
                        href={config.social.twitter}
                        target="_blank"
                      >
                        <Button variant={"outline"}>
                          <SiX size={24} />
                        </Button>
                      </Link>
                    )}
                    {config.social.github && (
                      <Link
                        href={config.social.github}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button variant={"outline"}>
                          <SiGithub size={24} />
                        </Button>
                      </Link>
                    )}
                    {config.social.linkedin && (
                      <Link
                        href={config.social.linkedin}
                        target="_blank"
                        className="cursor-can-hover"
                      >
                        <Button variant={"outline"}>
                          <SiLinkedin size={24} />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;


"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaEnvelope,
  FaGit,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiJupyter,
  SiVscodium,
} from "react-icons/si";
import { BsFileEarmarkSpreadsheet, BsBarChartFill } from "react-icons/bs";
import { TbBrandGoogle } from "react-icons/tb";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { config } from "@/data/config";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: config.email,
    href: `mailto:${config.email}`,
    icon: <FaEnvelope height={"50px"} />,
  },
  {
    name: "GitHub",
    href: config.social.github,
    content: "/siddcodez",
    icon: <FaGithub height={"50px"} />,
  },
  ...(config.social.linkedin
    ? [
        {
          name: "LinkedIn",
          href: config.social.linkedin,
          content: "LinkedIn Profile",
          icon: <FaLinkedin height={"50px"} />,
        },
      ]
    : []),
];

const TOOLS = [
  {
    name: "Python",
    content: "Core language for data analysis, modeling, and automation",
    icon: <SiPython size={"50px"} color={"#3776AB"} />,
    color: "#3776AB",
  },
  {
    name: "SQL",
    content: "Relational database querying, aggregation, and data extraction",
    icon: <BsBarChartFill size={"50px"} color={"#CC2927"} />,
    color: "#CC2927",
  },
  {
    name: "Pandas",
    content: "Data manipulation, transformation, and dataframe analytics",
    icon: <SiPandas size={"50px"} color={"#150458"} />,
    color: "#150458",
  },
  {
    name: "NumPy",
    content: "High-performance numerical computing and array operations",
    icon: <SiNumpy size={"50px"} color={"#4DABF7"} />,
    color: "#4DABF7",
  },
  {
    name: "Excel",
    content: "Advanced formulas, pivot tables, data cleaning, and analysis",
    icon: <BsFileEarmarkSpreadsheet size={"50px"} color={"#217346"} />,
    color: "#217346",
  },
  {
    name: "Power BI",
    content: "Interactive business intelligence dashboards and data storytelling",
    icon: <BsBarChartFill size={"50px"} color={"#F2C811"} />,
    color: "#F2C811",
  },
  {
    name: "Tableau",
    content: "Visual analytics, interactive reports, and executive dashboards",
    icon: <BsBarChartFill size={"50px"} color={"#E97627"} />,
    color: "#E97627",
  },
  {
    name: "Scikit-Learn",
    content: "Machine learning for classification, regression, and clustering",
    icon: <SiScikitlearn size={"50px"} color={"#F7931E"} />,
    color: "#F7931E",
  },
  {
    name: "Jupyter",
    content: "Interactive notebook environment for exploratory data analysis",
    icon: <SiJupyter size={"50px"} color={"#F37726"} />,
    color: "#F37726",
  },
  {
    name: "Google Colab",
    content: "Cloud-based Jupyter notebooks for collaborative analysis",
    icon: <TbBrandGoogle size={"50px"} color={"#F9AB00"} />,
    color: "#F9AB00",
  },
  {
    name: "Git",
    content: "Version control for tracking code changes and project history",
    icon: <FaGit size={"50px"} color={"#F05032"} />,
    color: "#F05032",
  },
  {
    name: "GitHub",
    content: "Hosting repositories, collaboration, and code sharing",
    icon: <FaGithub size={"50px"} color={"#fff"} />,
    color: "#000000",
  },
  {
    name: "VS Code",
    content: "Modern code editor configured for Python and data workflows",
    icon: <SiVscodium size={"50px"} color={"#007ACC"} />,
    color: "#007ACC",
  },
];

function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);
  useEffect(() => {
    setToolsLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] text-foreground pt-28 pb-20">
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:basis-1/3">
          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-border bg-secondary/20"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex flex-row lg:flex-col items-center">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-secondary rounded-xl lg:mb-5 overflow-hidden">
                <Image
                  className="rounded-full p-2 lg:p-4 w-[100px] md:w-[150px] lg:w-[200px] aspect-square object-cover"
                  alt="Siddharth Tomar"
                  src="/assets/me.jpg"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col gap-2 lg:items-center ml-6 md:ml-10 lg:ml-0">
                <p className="text-center text-xl font-semibold">{config.author}</p>
                <div className="text-xs bg-accent w-fit px-3 py-1 rounded-full text-accent-foreground">
                  Data Analyst
                </div>
              </div>
            </div>
            <div>
              <hr className="my-6 border-border" />
              <ul className="flex flex-col gap-3">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      className="flex items-center px-3 gap-3 w-full h-12 border-border bg-secondary/50 hover:border-accent/30 border-[.5px] rounded-md transition-colors"
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <div className="w-8 flex justify-center">{link.icon}</div>
                      <div className="flex flex-col overflow-hidden">
                        <div className="text-sm font-medium">{link.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {link.content}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <main className="w-full lg:basis-2/3">
          <div
            className="p-6 md:p-10 border-[.5px] rounded-2xl border-border bg-secondary/20"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <h1 className="text-3xl mb-6 font-display">About me</h1>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Hey there! I&apos;m Siddharth, an aspiring Data Analyst passionate about
              transforming raw data into actionable insights, building statistical analyses,
              and communicating compelling data stories. With practical hands-on experience
              in Python, SQL, Excel, Power BI, and Tableau, I thrive on solving complex
              problems and driving data-informed decisions.
            </p>
            <p className="mb-10 text-muted-foreground leading-relaxed">
              When I&apos;m not analyzing datasets or crafting dashboards, you can find me
              exploring modern machine learning techniques, diving into data visualizations,
              or sipping coffee while brainstorming my next analytical project.
            </p>

            <h2 className="text-2xl mb-6 font-display">Tools &amp; Technologies</h2>
            <div className="mb-5">
              {!toolsLoaded ? (
                <div className="h-[100px] flex items-center justify-center text-muted-foreground text-sm">
                  Loading tools...
                </div>
              ) : (
                <Splide
                  options={{
                    type: "loop",
                    interval: 2000,
                    autoplay: true,
                    pagination: false,
                    speed: 2000,
                    perPage: 5,
                    perMove: 1,
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                    breakpoints: {
                      768: {
                        perPage: 3,
                      },
                      480: {
                        perPage: 2,
                      },
                    },
                  }}
                  aria-label="Tools and Technologies"
                >
                  {TOOLS.map((tool) => (
                    <SplideSlide key={tool.name}>
                      <div
                        className="flex flex-col items-center justify-center p-3 border-[.5px] border-border rounded-xl bg-secondary/40 mx-1 h-24"
                        title={tool.name}
                      >
                        {tool.icon}
                        <span className="text-[11px] mt-2 text-muted-foreground text-center truncate w-full">
                          {tool.name}
                        </span>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;

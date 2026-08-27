const config = {
  title: "Siddharth Tomar | Data Analyst",
  description: {
    long: "Explore the portfolio of Siddharth, an aspiring Data Analyst specializing in SQL, Python, Excel, Power BI, and data-driven insights. Discover my learning journey and upcoming projects. Let's build something amazing together!",
    short:
      "Discover the portfolio of Siddharth, an aspiring Data Analyst focused on data analytics and data science.",
  },
  keywords: [
    "Siddharth",
    "portfolio",
    "data analyst",
    "data analytics",
    "data science",
    "SQL",
    "Python",
    "Power BI",
    "Excel",
    "Tableau",
    "machine learning",
  ],
  author: "Siddharth Tomar",
  email: "thakursiddharthtomar@gmail.com",
  site: "",

  // for github stars button — point at the CURRENT owner's actual repo
  githubUsername: "siddcodez",
  githubRepo: "siddharth-data-analyst-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    github: "https://github.com/siddcodez",
  },
};
export { config };

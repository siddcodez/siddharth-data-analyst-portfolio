export enum SkillNames {
  // Data Analytics
  EXCEL = "excel",
  SQL = "sql",
  POWER_BI = "powerbi",
  TABLEAU = "tableau",
  PANDAS = "pandas",
  NUMPY = "numpy",
  DATA_CLEANING = "datacleaning",
  DATA_VISUALIZATION = "datavisualization",
  EDA = "eda",
  STATISTICS = "statistics",

  // Data Science
  PYTHON = "python",
  MACHINE_LEARNING = "ml",
  SCIKIT_LEARN = "scikitlearn",
  FEATURE_ENGINEERING = "featureeng",
  REGRESSION = "regression",
  CLASSIFICATION = "classification",
  CLUSTERING = "clustering",
  PREDICTIVE_MODELING = "predictivemodel",
  JUPYTER = "jupyter",

  // Tools & Technologies
  GITHUB = "github",
  VSCODE = "vscode",
  GOOGLE_COLAB = "googlecolab",
  ANACONDA = "anaconda",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  // === DATA ANALYTICS ===
  [SkillNames.EXCEL]: {
    id: 1,
    name: "excel",
    label: "Excel",
    shortDescription: "Master of spreadsheets, pivot tables, and data magic! 📊✨",
    color: "#107C41",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftexcel/microsoftexcel-original.svg",
  },
  [SkillNames.SQL]: {
    id: 2,
    name: "sql",
    label: "SQL",
    shortDescription: "Query the data like a boss, JOIN with precision! 🔍💾",
    color: "#0284C7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  [SkillNames.POWER_BI]: {
    id: 3,
    name: "powerbi",
    label: "Power BI",
    shortDescription: "Turn raw data into stunning visual insights! 📈🎨",
    color: "#D9A406",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1200px-New_Power_BI_Logo.svg.png",
  },
  [SkillNames.TABLEAU]: {
    id: 4,
    name: "tableau",
    label: "Tableau",
    shortDescription: "Create interactive dashboards that tell data stories! 📊💬",
    color: "#3B82F6",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tableau_Logo.png/1200px-Tableau_Logo.png",
  },
  [SkillNames.PANDAS]: {
    id: 5,
    name: "pandas",
    label: "Pandas",
    shortDescription: "Wrangle, transform, and analyze data like a pro! 🐼🎯",
    color: "#1E40AF",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.NUMPY]: {
    id: 6,
    name: "numpy",
    label: "NumPy",
    shortDescription: "Numerical computing with arrays at lightning speed! ⚡🔢",
    color: "#0284C7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  [SkillNames.DATA_CLEANING]: {
    id: 7,
    name: "datacleaning",
    label: "Data Cleaning",
    shortDescription: "Handle missing values, outliers, and data quality issues! 🧹✨",
    color: "#0F766E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-sql/filetype-sql-original.svg",
  },
  [SkillNames.DATA_VISUALIZATION]: {
    id: 8,
    name: "datavisualization",
    label: "Data Visualization",
    shortDescription: "Make data beautiful and understandable! 🎨📊",
    color: "#6D28D9",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  },
  [SkillNames.EDA]: {
    id: 9,
    name: "eda",
    label: "Exploratory Data Analysis",
    shortDescription: "Explore, discover patterns, generate hypotheses! 🔍💡",
    color: "#0E7490",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-sql/filetype-sql-original.svg",
  },
  [SkillNames.STATISTICS]: {
    id: 10,
    name: "statistics",
    label: "Statistics",
    shortDescription: "Hypothesis testing, distributions, correlation analysis! 📉📈",
    color: "#2563EB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
  },

  // === DATA SCIENCE ===
  [SkillNames.PYTHON]: {
    id: 11,
    name: "python",
    label: "Python",
    shortDescription: "The backbone of data science, coding with elegance! 🐍💻",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.MACHINE_LEARNING]: {
    id: 12,
    name: "ml",
    label: "Machine Learning",
    shortDescription: "Train models to predict the future! 🤖🔮",
    color: "#3730A3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  [SkillNames.SCIKIT_LEARN]: {
    id: 13,
    name: "scikitlearn",
    label: "Scikit-learn",
    shortDescription: "ML library for classification, regression, clustering! 🎯",
    color: "#F59E0B",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/260px-Scikit_learn_logo_small.svg.png",
  },
  [SkillNames.FEATURE_ENGINEERING]: {
    id: 14,
    name: "featureeng",
    label: "Feature Engineering",
    shortDescription: "Craft meaningful features for powerful models! ⚙️✨",
    color: "#0891B2",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-python/filetype-python-original.svg",
  },
  [SkillNames.REGRESSION]: {
    id: 15,
    name: "regression",
    label: "Regression",
    shortDescription: "Predict continuous values with precision! 📊➗",
    color: "#059669",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-python/filetype-python-original.svg",
  },
  [SkillNames.CLASSIFICATION]: {
    id: 16,
    name: "classification",
    label: "Classification",
    shortDescription: "Categorize data with decision trees and more! 🏷️🌳",
    color: "#1D4ED8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-python/filetype-python-original.svg",
  },
  [SkillNames.CLUSTERING]: {
    id: 17,
    name: "clustering",
    label: "Clustering",
    shortDescription: "Group similar data points, find patterns! 🎯📍",
    color: "#6366F1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-python/filetype-python-original.svg",
  },
  [SkillNames.PREDICTIVE_MODELING]: {
    id: 18,
    name: "predictivemodel",
    label: "Predictive Analytics",
    shortDescription: "Build models that forecast the future! 🔮📈",
    color: "#4F46E5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filetype-python/filetype-python-original.svg",
  },
  [SkillNames.JUPYTER]: {
    id: 19,
    name: "jupyter",
    label: "Jupyter Notebook",
    shortDescription: "Interactive coding for exploratory analysis! 📓💻",
    color: "#B4532A",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },

  // === TOOLS & TECHNOLOGIES ===
  [SkillNames.GITHUB]: {
    id: 20,
    name: "github",
    label: "GitHub",
    shortDescription: "Version control and collaboration made easy! 🐙💪",
    color: "#475569",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.VSCODE]: {
    id: 21,
    name: "vscode",
    label: "VS Code",
    shortDescription: "The code editor of choice for data scientists! 📝⚡",
    color: "#007ACC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  [SkillNames.GOOGLE_COLAB]: {
    id: 22,
    name: "googlecolab",
    label: "Google Colab",
    shortDescription: "Cloud-based Jupyter for GPU-powered analysis! ☁️🚀",
    color: "#D9A406",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
  },
  [SkillNames.ANACONDA]: {
    id: 23,
    name: "anaconda",
    label: "Anaconda",
    shortDescription: "Python distribution and package management! 🐍📦",
    color: "#16A34A",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg",
  },
};



import { SkillNames } from "@/data/constants";

export type Section = "hero" | "about" | "skills" | "projects" | "contact";

/**
 * Device tiers (determined by useMediaQuery in animated-background.tsx):
 *   mobile  → max-width: 767px  (phones)
 *   tablet  → 768px – 1023px   (tablets)
 *   desktop → 1024px+          (laptops / desktops)
 */

// These are the names of the real keycap objects in the Data Science Spline scene.
export const SPLINE_SKILL_MAPPING: Record<string, SkillNames> = {
  python: SkillNames.PYTHON,
  sql: SkillNames.SQL,
  pandas: SkillNames.PANDAS,
  numpy: SkillNames.NUMPY,
  excel: SkillNames.EXCEL,
  powerbi: SkillNames.POWER_BI,
  tableau: SkillNames.TABLEAU,
  scikitlearn: SkillNames.SCIKIT_LEARN,
  jupyter: SkillNames.JUPYTER,
  googlecolab: SkillNames.GOOGLE_COLAB,
  git: SkillNames.GITHUB,
  github: SkillNames.GITHUB,
  vscode: SkillNames.VSCODE,
  anaconda: SkillNames.ANACONDA,
  statistics: SkillNames.STATISTICS,
  eda: SkillNames.EDA,
  datavisualization: SkillNames.DATA_VISUALIZATION,
  ml: SkillNames.MACHINE_LEARNING,
  regression: SkillNames.REGRESSION,
  classification: SkillNames.CLASSIFICATION,
  clustering: SkillNames.CLUSTERING,
  predictivemodel: SkillNames.PREDICTIVE_MODELING,
  datacleaning: SkillNames.DATA_CLEANING,
  featureeng: SkillNames.FEATURE_ENGINEERING,
};

export const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 225, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    tablet: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 180, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.30, y: 0.30, z: 0.30 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    tablet: {
      scale: { x: 0.35, y: 0.35, z: 0.35 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    tablet: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.30, y: 0.30, z: 0.30 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    tablet: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.30, y: 0.30, z: 0.30 },
      position: { x: 0, y: 150, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 350, y: -250, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    tablet: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 250, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: 150, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
};

export const getKeyboardState = ({
  section,
  isMobile,
  isTablet,
}: {
  section: Section;
  isMobile: boolean;
  /** true when viewport is 768–1023px wide */
  isTablet: boolean;
}) => {
  // Resolve device tier: mobile > tablet > desktop
  const tier = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
  const baseTransform = STATES[section][tier];

  const getScaleOffset = () => {
    const width = window.innerWidth;
    const DESKTOP_REF_WIDTH = 1280;
    const MOBILE_REF_WIDTH = 390;

    if (isMobile) {
      const targetScale = width / MOBILE_REF_WIDTH;
      // Restored visual scaling behavior: 0.50 to 0.60
      return Math.min(Math.max(targetScale, 0.5), 0.6);
    }

    if (isTablet) {
      // Tablet scales gracefully with desktop reference without bloated extremes
      const targetScale = width / DESKTOP_REF_WIDTH;
      return Math.min(Math.max(targetScale, 0.6), 0.95);
    }

    // Desktop: reference 1280px.
    const targetScale = width / DESKTOP_REF_WIDTH;
    return Math.min(Math.max(targetScale, 0.5), 1.15);
  };

  const scaleOffset = getScaleOffset();

  return {
    ...baseTransform,
    scale: {
      x: Math.abs(baseTransform.scale.x * scaleOffset),
      y: Math.abs(baseTransform.scale.y * scaleOffset),
      z: Math.abs(baseTransform.scale.z * scaleOffset),
    },
  };
};

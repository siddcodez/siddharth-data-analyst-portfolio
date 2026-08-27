import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="w-full min-h-[100svh] md:h-[150dvh] pointer-events-none"
    >
      <SectionHeader 
        id='skills' 
        title="Skills & Expertise" 
        desc="(Hover / tap keys to explore Data Analytics & Data Science skills)" 
      />
    </SectionWrapper>
  );
};

export default SkillsSection;

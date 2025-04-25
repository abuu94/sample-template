// Enum for Skill Levels
export type SkillEnum = "beginer" | "intermidiate" | "advanced" | "expert";

// Skill Type Definition
export type SkillResponse = {
  id?: number; // Optional for new skill being created
  skill_name: string; // Name of the skill
  skill_level: SkillEnum; // Skill level with default value "beginer"
  comments?: string; // Optional comments about the skill
  user_id: number; // Foreign key reference to the user (from User type)
};

// Skill Type Definition
export type SkillRequest = {
    skill_name: string; // Name of the skill
    skill_level: SkillEnum; // Skill level with default value "beginer"
    comments?: string; // Optional comments about the skill
    user_id: number; // Foreign key reference to the user (from User type)
  };

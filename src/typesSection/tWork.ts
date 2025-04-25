// Enum for Work Types
export type WorkEnum = "parttime" | "fulltime" | "freelance";

// Enum for Work Experience Levels
export type WorkExperience = "beginer" | "intermidiate" | "advanced" | "expert";



// Work Type Definition
export type WorkResponse = {
    id?: number; // Optional for new work being created
    work_title: string; // The title of the work
    work_type: WorkEnum; // The type of work (default: "parttime")
    work_description?: string; // Optional description of the work
    work_experience: WorkExperience; // The level of experience required (default: "beginer")
    user_id: number; // Foreign key referencing the User (from User type)
  };

export type WorkRequest = {
  work_title: string; // The title of the work
  work_type: WorkEnum; // The type of work (default: "parttime")
  work_description?: string; // Optional description of the work
  work_experience: WorkExperience; // The level of experience required (default: "beginer")
  user_id: number; // Foreign key referencing the User (from User type)
};

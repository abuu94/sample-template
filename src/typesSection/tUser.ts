// export type UserResponse = {
//     id?: number; // Optional for new items being created
//     fullname: string;
//     username: string;
//     pwd: string;
//     created?: string; // Optional ISO 8601 datetime string
//     urole: "admin" | "guest" | "supporter"; // RoleEnum
//     status: "active" | "suspended" | "pending" | "disabled"; // StatusEnum
//     phonenumber?: string; // Optional phone number
//     picture?: string; // Optional URL or path to the picture
//     region?: string; // Optional region
//     street?: string; // Optional street
//     levelofeducation: "primary" | "secondary" | "degree" | "postgraduate" | "none"; // LevelOfEducationEnum
//     income: "below_1000_tsh" | "below_10000_tsh" | "below_30000_tsh"; // IncomeEnum
//     email: string;
//     disability?: string; // Optional field for disability information
//   };
  
//   export type UserRequest = {
    
//     fullname: string;
//     username: string;
//     pwd: string;
//     created?: string; // Optional ISO 8601 datetime string
//     urole: "admin" | "guest" | "supporter"; // RoleEnum
//     status: "active" | "suspended" | "pending" | "disabled"; // StatusEnum
//     phonenumber?: string; // Optional phone number
//     picture?: string; // Optional URL or path to the picture
//     region?: string; // Optional region
//     street?: string; // Optional street
//     levelofeducation: "primary" | "secondary" | "degree" | "postgraduate" | "none"; // LevelOfEducationEnum
//     income: "below_1000_tsh" | "below_10000_tsh" | "below_30000_tsh"; // IncomeEnum
//     email: string;
//     disability?: string; // Optional field for disability information
//   };

  export type UroleEnum = "admin" | "guest" | "supporter";
  export type StatusEnum =  "active" | "suspended" | "pending" | "disabled";
  export type LevelofeducationEnum = "primary" | "secondary" | "degree" | "postgraduate" | "none";
  export type IncomeEnum = "below_1000_tsh" | "below_10000_tsh" | "below_30000_tsh";
  export type UserResponse = {
    id?: number; // Optional for new items being created
    fullname: string;
    username: string;
    pwd: string;
    created?: string; // Optional ISO 8601 datetime string
    urole: UroleEnum; // RoleEnum
    status: StatusEnum; // StatusEnum
    phonenumber?: string; // Optional phone number
    picture?: string; // Optional URL or path to the picture
    region?: string; // Optional region
    street?: string; // Optional street
    levelofeducation:LevelofeducationEnum; // LevelOfEducationEnum
    income: IncomeEnum; // IncomeEnum
    email?: string;
    disability?: string; // Optional field for disability information
  };
  
  export type UserRequest = {
    
    fullname: string;
    username: string;
    pwd: string;
    created?: string; 
    urole: UroleEnum; 
    status: StatusEnum;
    phonenumber?: string; // Optional phone number
    picture?: string; // Optional URL or path to the picture
    region?: string; // Optional region
    street?: string; // Optional street
    levelofeducation: LevelofeducationEnum; 
    income: IncomeEnum;
    email?: string;
    disability?: string; // Optional field for disability information
  };




 
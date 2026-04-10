export type Role = "Admin" | "Doctor" | "Patient";

export interface User {
  id: string;
  name: string;
  role: Role;
  permissions: string[];
}

import { Role } from "@/types/user";

export const ALL_PERMISSIONS = [
  "manage_users",
  "view_reports",
  "manage_settings",
  "view_patients",
  "edit_medical_records",
  "view_own_records",
  "book_appointments",
  "restrict_access",
];

export const DEFAULT_PERMISSIONS: Record<Role, string[]> = {
  Admin: ["manage_users", "view_reports", "manage_settings"],
  Doctor: ["view_patients", "edit_medical_records"],
  Patient: ["view_own_records", "book_appointments"],
};

import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "name_required"),
  lastName: z.string().min(1, "name_required"),
  role: z.enum(["Admin", "Doctor", "Patient"], {
    errorMap: () => ({ message: "role_required" }),
  }),
  permissions: z.array(z.string()).min(1, "permission_required"),
});

export type UserFormData = z.infer<typeof userSchema>;

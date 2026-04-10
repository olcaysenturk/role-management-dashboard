import { useState, useEffect, useMemo, FormEvent } from "react";
import { Modal, Input, Select, Button } from "@/components/ui";
import { Role } from "@/types/user";
import { useLanguage } from "@/hooks/language";
import { UserFormModalProps } from "@/types/dashboard";
import { useAppSelector } from "@/store/hooks";
import { ShieldIcon } from "@/components/icons";
import { toast } from "sonner";
import { userSchema } from "@/lib/validation/user-schema";
import { ALL_PERMISSIONS, DEFAULT_PERMISSIONS } from "@/lib/constants/permissions";



export function UserFormModal({ isOpen, onClose, onSubmit, user }: UserFormModalProps) {
  const { messages } = useLanguage();
  const t = messages.users;
  const users = useAppSelector((state) => state.users.users);

  const roleOptions = useMemo(() => [
    { label: t.roles.admin, value: "Admin" },
    { label: t.roles.doctor, value: "Doctor" },
    { label: t.roles.patient, value: "Patient" },
  ], [t]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<Role>("Patient");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && isOpen) {
      const nameParts = user.name.trim().split(" ");
      if (nameParts.length > 1) {
        setLastName(nameParts.pop() || "");
        setFirstName(nameParts.join(" "));
      } else {
        setFirstName(user.name);
        setLastName("");
      }
      setRole(user.role);
      setPermissions(user.permissions);
      setErrors({});
    } else if (isOpen) {
      setFirstName("");
      setLastName("");
      setRole("Patient");
      setPermissions(DEFAULT_PERMISSIONS["Patient"]);
      setErrors({});
    }
  }, [user, isOpen]);

  const handleRoleChange = (newRole: string) => {
    const selectedRole = newRole as Role;
    setRole(selectedRole);
    setPermissions(DEFAULT_PERMISSIONS[selectedRole]);
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: "" }));
    }
  };

  const togglePermission = (perm: string) => {
    setPermissions(prev =>
      prev.includes(perm)
        ? prev.filter(p => p !== perm)
        : [...prev, perm]
    );
  };

  const validate = () => {
    const result = userSchema.safeParse({ firstName, lastName, role, permissions });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        newErrors[path] = t[issue.message as keyof typeof t] as string;
      });
      setErrors(newErrors);
      return false;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    if (!user) {
      const exists = users.some(u => u.name.toLowerCase() === fullName.toLowerCase());
      if (exists) {
        setErrors({ firstName: t.user_exists, lastName: t.user_exists });
        return false;
      }
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name: `${firstName.trim()} ${lastName.trim()}`, role, permissions });
    } else {
      const firstError = Object.values(errors)[0] || t.name_required;
      toast.error(firstError);
    }
  };

  const isEditMode = !!user;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? t.edit_role : t.add_user}
      closeAriaLabel={t.cancel}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1.5">{t.first_name}</label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors(prev => ({ ...prev, firstName: "" }));
                }}
                placeholder="Ahmet"
                disabled={isEditMode}
                error={errors.firstName}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1.5">{t.last_name}</label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors(prev => ({ ...prev, lastName: "" }));
                }}
                placeholder="Yılmaz"
                disabled={isEditMode}
                error={errors.lastName}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.role}</label>
            <Select
              value={role}
              onChange={handleRoleChange}
              options={roleOptions}
              placeholder={t.select_role}
              ariaLabel={t.role}
            />
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <ShieldIcon className="w-4 h-4 text-blue-600" />
              {t.manage_permissions}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
              {ALL_PERMISSIONS.map((perm) => (
                <label
                  key={perm}
                  htmlFor={`perm-${perm}`}
                  className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all border ${permissions.includes(perm)
                      ? "bg-white border-blue-100 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                >
                  <input
                    id={`perm-${perm}`}
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    {t.permission_labels[perm as keyof typeof t.permission_labels] || perm}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="min-w-[100px]">
            {t.cancel}
          </Button>
          <Button type="submit" variant="primary" className="min-w-[100px]">
            {isEditMode ? t.save_changes : t.add_user}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

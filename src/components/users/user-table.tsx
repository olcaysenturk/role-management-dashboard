
import { User, Role } from "@/types/user";
import { Button } from "@/components/ui";
import { EditIcon, ShieldIcon, TrashIcon } from "@/components/icons";
import { useLanguage } from "@/hooks/language";
import { UserTableProps } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function UserTable({ users, isLoading, onEdit, onDelete }: UserTableProps) {
  const { messages } = useLanguage();
  const t = messages.users;

  const getRoleTranslation = (role: Role) => {
    const roles = t.roles as Record<string, string>;
    return roles[role.toLowerCase()] || role;
  };

  const roleBadgeStyles: Record<Role, string> = {
    Admin: "bg-purple-100 text-purple-800",
    Doctor: "bg-blue-100 text-blue-800",
    Patient: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.id_label}
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.name}
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.role}
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.permissions}
              </th>
              <th scope="col" className="relative px-6 py-4">
                <span className="sr-only">{t.actions}</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-slate-200 relative">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-20">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 font-medium animate-pulse">{t.loading}</p>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20">
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                      <EditIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{t.no_users_found}</h3>
                    <p className="text-sm text-slate-500 max-w-xs">{t.no_users_description}</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      roleBadgeStyles[user.role],
                      user.role === "Admin" ? "border-purple-200" : 
                      user.role === "Doctor" ? "border-blue-200" : "border-green-200"
                    )}>
                      {getRoleTranslation(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {user.permissions.length > 0 ? (
                        user.permissions.map((perm) => (
                          <span key={perm} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/50">
                            <ShieldIcon className="w-3 h-3 opacity-50" />
                            {t.permission_labels[perm as keyof typeof t.permission_labels] || perm}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">{t.no_permissions}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" onClick={() => onEdit(user)} title={t.edit}>
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => onDelete(user.id)} title={t.delete}>
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

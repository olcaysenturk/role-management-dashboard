import { useMemo } from "react";
import { Input, Select, Button } from "@/components/ui";
import { SearchIcon, UserPlusIcon } from "@/components/icons";
import { useLanguage } from "@/hooks/language";
import { UserFiltersProps } from "@/types/dashboard";

export function UserFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  onAdd,
}: UserFiltersProps) {
  const { messages } = useLanguage();
  const t = messages.users;

  const roleFilterOptions = useMemo(() => [
    { label: t.roles.all, value: "All" },
    { label: t.roles.admin, value: "Admin" },
    { label: t.roles.doctor, value: "Doctor" },
    { label: t.roles.patient, value: "Patient" },
  ], [t]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
      <div className="relative flex-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-4 w-4 text-slate-400" />
        </div>
        <Input
          id="search-users"
          aria-label={t.search_placeholder}
          className="pl-9 w-full"
          placeholder={t.search_placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48 shrink-0">
        <Select
          value={roleFilter}
          onChange={onRoleFilterChange}
          options={roleFilterOptions}
          ariaLabel={t.roles.all || "Rol filtresi"}
        />
      </div>
      <Button onClick={onAdd} className="w-full sm:w-auto shrink-0">
        <UserPlusIcon className="w-5 h-5 mr-2" />
        {t.add_user}
      </Button>
    </div>
  );
}

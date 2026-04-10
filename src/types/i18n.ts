import type { Locale } from "@/lib/i18n/config";

export type HeaderMessages = {
  language: {
    label: string;
    options: Record<Locale, string>;
  };
  logo: {
    primary: string;
    secondary: string;
  };
  profile: {
    name: string;
    description: string;
    menu: {
      account: string;
      preferences: string;
      signOut: string;
    };
  };
};

export type FooterMessages = {
  brand: string;
  copyright: string;
};

export type HomeMessages = {
  title: string;
};

export type UsersMessages = {
  roles: {
    admin: string;
    doctor: string;
    patient: string;
    all: string;
  };
  add_user: string;
  edit_user: string;
  edit_role: string;
  name: string;
  role: string;
  permissions: string;
  actions: string;
  search_placeholder: string;
  select_role: string;
  save_changes: string;
  cancel: string;
  delete: string;
  edit: string;
  delete_confirm: string;
  no_users: string;
  no_users_found: string;
  no_users_description: string;
  loading: string;
  previous: string;
  next: string;
  page_info: string;
  no_permissions: string;
  id_label: string;
  full_name: string;
  first_name: string;
  last_name: string;
  permission_labels: {
    manage_users: string;
    manage_roles: string;
    manage_settings: string;
    view_reports: string;
    view_patients: string;
    view_medical_records: string;
    view_own_records: string;
    edit_medical_records: string;
    create_prescriptions: string;
    book_appointments: string;
  };
  success_add: string;
  success_update: string;
  success_delete: string;
  error_fetch: string;
  error_add: string;
  error_update: string;
  error_delete: string;
  name_required: string;
  role_required: string;
  permission_required: string;
  user_exists: string;
  manage_permissions: string;
};

export type LanguageMessages = {
  header: HeaderMessages;
  footer: FooterMessages;
  home: HomeMessages;
  users: UsersMessages;
};

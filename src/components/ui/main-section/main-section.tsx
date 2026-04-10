import { MainSectionProps } from "@/types/ui";

export function MainSection({ children, className }: MainSectionProps) {
  return (
    <section
      className={`w-full rounded-2xl border border-slate-200 bg-white p-6 sm:rounded-3xl sm:p-8 lg:p-10 ${className ?? ""
        }`}
    >
      {children}
    </section>
  );
}

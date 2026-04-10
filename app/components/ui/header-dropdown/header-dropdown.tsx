import type { ReactNode, RefObject } from "react";

type HeaderDropdownProps = {
  buttonClassName: string;
  buttonContent: ReactNode;
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onToggle: () => void;
  panelClassName?: string;
};

export function HeaderDropdown({
  buttonClassName,
  buttonContent,
  children,
  containerRef,
  isOpen,
  onToggle,
  panelClassName,
}: HeaderDropdownProps) {
  const basePanelClassName =
    "absolute top-full right-0 z-20 mt-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]";
  const statePanelClassName = isOpen
    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
    : "pointer-events-none translate-y-2 scale-95 opacity-0";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={buttonClassName}
      >
        {buttonContent}
      </button>

      <div
        className={`${basePanelClassName} ${statePanelClassName} ${
          panelClassName ?? ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

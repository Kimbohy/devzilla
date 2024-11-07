import Link from "next/link";

interface SubMenuItemProps {
  href: string;
  currentPath: string;
  icon: React.ReactNode;
  label: string;
}

export function SidebarSubMenuItem({
  href,
  currentPath,
  icon,
  label,
}: SubMenuItemProps) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`block group transition-colors duration-200 rounded-md py-2 px-3
        ${
          isActive
            ? "bg-primary/20 text-primary"
            : "text-slate-300 hover:bg-slate-800/50 hover:text-primary"
        }`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5">{icon}</div>
        <span className={`text-sm ${isActive ? "font-medium" : ""}`}>
          <span className="hidden md:inline">{label}</span>
          <span className="md:hidden">{label.slice(0, 3)}.</span>
        </span>
      </div>
    </Link>
  );
}

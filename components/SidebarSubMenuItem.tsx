import Link from "next/link";

// components/SidebarSubMenuItem.tsx
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
  return (
    <Link href={href} className="block group">
      <div className="flex items-center space-x-3">
        <div
          className={`w-5 h-5 transition-colors duration-200 ${
            currentPath === href
              ? "text-primary"
              : "text-slate-300 group-hover:text-primary"
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-sm transition-colors duration-200 ${
            currentPath === href
              ? "text-primary font-medium"
              : "text-slate-300 group-hover:text-primary"
          }`}
        >
          <span className="hidden md:inline">{label}</span>
          <span className="md:hidden">{label.slice(0, 3)}.</span>
        </span>
      </div>
    </Link>
  );
}

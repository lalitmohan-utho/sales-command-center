import {
  LayoutDashboard,
  Users,
  UserPlus,
  Building2,
  TrendingUp,
  CheckSquare,
  BarChart3,
  Settings,
  Headphones,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Sales Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Account Management", icon: Building2, url: "/account-management" },
  { title: "Leads", icon: UserPlus, url: "/leads" },
  { title: "Support", icon: Headphones, url: "/support" },
  { title: "Contacts", icon: Users, url: "/contacts" },
  { title: "Deals", icon: TrendingUp, url: "/deals" },
  { title: "Tasks", icon: CheckSquare, url: "/tasks" },
  { title: "Reports", icon: BarChart3, url: "/reports" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 border-r bg-sidebar min-h-screen">
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

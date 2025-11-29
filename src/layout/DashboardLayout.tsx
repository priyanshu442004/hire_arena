import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Video,
  Users,
  BarChart2,
  Settings,
  BarChartBig,
} from "lucide-react";

const DashboardLayout = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5 text-[#565656]" />,
    },
    {
      name: "My Resume",
      path: "/dashboard/pitches",
      icon: <FileText className="w-5 h-5 text-[#565656]" />,
    },
    {
      name: "Recorded Sessions",
      path: "/dashboard/recorded",
      icon: <Video className="w-5 h-5 text-[#565656]" />,
    },
    {
      name: "AI Interviewers",
      path: "/dashboard/judges",
      icon: <Users className="w-5 h-5 text-[#565656]" />,
    },
    {
      name: "Score",
      path: "/dashboard/score",
      icon: <BarChart2 className="w-5 h-5 text-[#565656]" />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <BarChartBig className="w-5 h-5 text-[#565656]" />,
    },

    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="w-5 h-5 text-[#565656]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-[#565656] via-slate-800 to-slate-900 text-white pt-[70px]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#f9f9f9] fixed pt-8 left-0 h-[calc(100vh-70px)] p-4 overflow-y-auto">
          <nav className="space-y-2">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md transition
  ${
    isActive
      ? "bg-[#ebebeb] text-[#50b5d8] hover:bg-[#]"
      : "hover:bg-slate-700 text-[#8b8b8b]"
  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-6 h-[calc(100vh-70px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

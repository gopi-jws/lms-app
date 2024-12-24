import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./classtopbar.css";
import {
  LayoutDashboard,
  BookOpen,
  Database,
  GraduationCap,
  Users,
} from "lucide-react";

// Navigation items with their respective paths and icons
const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tests", href: "/test", icon: BookOpen },
  { name: "Question Banks", href: "/QuestionBank", icon: Database },
  { name: "Classes", href: "/class", icon: GraduationCap },
  { name: "Teachers", href: "/teachers", icon: Users },
];

const TopBar = () => {
  const location = useLocation(); // Get current route path

  return (
    <header className="top-bar" style={{ marginLeft: '220px', width: 'calc(100% - 220px)' }}>
      <div className="top-bar-container">
        <div className="top-bar-content">
          <nav className="nav-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href} // Use `to` for `Link` navigation
                className={`nav-item ${
                  location.pathname === item.href ? "active" : "" // Add `active` class if current route matches
                }`}
              >
                <item.icon className="nav-icon" /> {/* Display icon */}
                <span className="nav-text">{item.name}</span>{" "}
                {/* Display name */}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

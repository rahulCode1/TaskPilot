import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useWorkContext } from "../../context/workTrackContext";

const Header = () => {
  const { logout, user } = useWorkContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { to: "/", label: "Dashboard  📊", end: true },
    { to: "/projects", label: "Pojects   📁" },
    { to: "/list", label: "Tasks      ✅" },
    { to: "/team", label: "Team    👥" },
    { to: "/report", label: "Report     📈" },
    ...(user ? [{ to: "/setting", label: "Settings   ⚙️" }] : []),

    ...(!user ? [{ to: "/signup", label: "Signup 🔒" }] : []),
    ...(!user ? [{ to: "/login", label: "Login 🔑" }] : []),
  ];

  return (
    <>
      {/* Mobile view */}
      <div className="w-100 d-md-none bg-info">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-light">
          <Link to="/" className="text-decoration-none">
            <h2 className="text-light">TaskPilot</h2>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen((prevStat) => !prevStat)}
            className="btn btn-outline-light"
          >
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="w-100 nav  d-flex flex-column d-md-none text-center gap-3 bg-info py-3">
            {navItems.map((nav, index) => (
              <li className="nav-item">
                <NavLink
                  key={index}
                  to={nav.to}
                  className={({ isActive }) =>
                    `d-block ${isActive ? "bg-white text-primary fw-semibold" : "text-light"} py-2 text-decoration-none`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop View */}
      <div
        className="d-none d-md-block bg-info flex-shrink-0 position-sticky top-0 shadow-lg"
        style={{
          width: "220px",
          height: "100dvh",
        }}
      >
        <aside className="d-none d-md-flex flex-column gap-4 text-center h-100">
          <Link to="/" className="text-decoration-none">
            <h2 className="text-light border-bottom border-1 border-light py-4 mb-5">
              TaskPilot
            </h2>
          </Link>

          {navItems.map((nav, index) => (
            <li className="nav-item ">
              <NavLink
                key={index}
                to={nav.to}
                className={({ isActive }) =>
                  `d-block ${isActive ? "bg-white  text-primary fw-semibold shadow-sm" : "text-light"} text-decoration-none px-4 py-2`
                }
              >
                {nav.label}
              </NavLink>
            </li>
          ))}

          {user && (
            <div className="d-none d-md-block mt-auto p-3">
              <button onClick={logout} className="btn btn-outline-light w-100">
                Logout ➜]
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default Header;

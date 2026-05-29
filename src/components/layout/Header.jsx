import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useWorkContext } from "../../context/workTrackContext";

const Header = () => {
  const { logout, user } = useWorkContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Dashboard", end: true },
    { to: "/projects", label: "Projects" },
    { to: "/list", label: "Tasks" },
    { to: "/team", label: "Team" },
    { to: "/report", label: "Report" },
    ...(user ? [{ to: "/setting", label: "Setting" }] : []),
    { to: "/signup", label: "Signup" },
    ...(!user ? [{ to: "/login", label: "Login" }] : []),
  ];

  return (
    <>
      {/* Mobile Header - Visible only on small screens */}
      <header className="d-md-none bg-info-subtle border-bottom position-fixed top-0 start-0 end-0 z-3">
        <div className="d-flex justify-content-between align-items-center px-3 py-3">
          <h4 className="fw-bold mb-0">TaskPilot</h4>
          <button
            className="btn btn-info"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-2"
              onClick={closeMobileMenu}
            ></div>
            <nav
              className="position-fixed top-0 end-0 bg-info-subtle h-100 shadow-lg z-3 overflow-auto"
              style={{ width: "250px" }}
            >
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="fw-bold mb-0">Menu</h5>
                <button
                  className="btn-close"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                ></button>
              </div>
              <ul className="nav nav-pills flex-column gap-2 p-3">
                {navItems.map((item) => (
                  <li key={item.to} className="nav-item">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `nav-link ${
                          isActive ? "active bg-info text-white" : "text-dark"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                {user && (
                  <li className="nav-item mt-3">
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="btn btn-secondary w-100"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </>
        )}
      </header>

      {/* Sidebar - Visible only on medium and large screens */}
      <aside className="d-none d-md-flex bg-info-subtle vh-100 flex-column">
        <h3 className="text-center py-4 border-bottom fw-bold">Workasana</h3>

        <ul className="nav nav-pills flex-column align-items-center gap-2 mt-3 flex-grow-1">
          {navItems.map((item) => (
            <li key={item.to} className="nav-item w-100 text-center">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active bg-info text-white" : "text-dark"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {user && (
          <div className="p-3 mt-auto">
            <button onClick={handleLogout} className="btn btn-secondary w-100">
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Header;

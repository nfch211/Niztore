import React from "react";

function Header({ login, username, setView, onLogin, onSignUp, onSignOut }) {
  const navItems = [
    { label: "About", href: "#", className: "nav-link px-2 text-secondary" },
    { label: "FAQ", href: "#", className: "nav-link px-2 text-white" },
  ];

  const viewButtons = [
    { label: "Shop", view: "shop" },
    { label: "Catalogue", view: "catalogue" },
    { label: "Orders", view: "orders" },
  ];

  return (
    <header className="header p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className={item.className}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="text-end">
            {login ? (
              <>
                <span className="me-3 text-white">
                  Welcome back, {username}!
                </span>
                <button
                  onClick={onSignOut}
                  type="button"
                  className="btn btn-outline-light me-4"
                >
                  Sign Out
                </button>
                <div className="d-inline-block">
                  {viewButtons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => setView(button.view)}
                      type="button"
                      className="btn btn-info ms-2"
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setView("login")}
                  type="button"
                  className="btn btn-outline-light me-2"
                >
                  Login
                </button>
                <button
                  onClick={() => setView("signup")}
                  type="button"
                  className="btn btn-warning"
                >
                  Sign-up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

import "./Sidebar.css";

function Sidebar({ role, setPage }) {
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="sidebar">
      {/* Top Section */}
      <div>

        {/* Logo */}

        <div className="logo">
          <img
            src="/foodbridge-logo.png"
            alt="FoodBridge"
            className="sidebar-logo"
          />

          <div className="logo-text">
            <h2>FoodBridge</h2>
            <p>Reduce • Reuse • Feed</p>
          </div>
        </div>

        {/* Menu */}

        <div className="menu">

          <h4>MAIN</h4>

          {/* Dashboard */}

          <button onClick={() => setPage("dashboard")}>
            🏠 Dashboard
          </button>

          {/* ================= DONOR ================= */}

          {role === "DONOR" && (
            <>
              <button onClick={() => setPage("donate")}>
                🍱 Donate Food
              </button>

              <button onClick={() => setPage("view")}>
                📦 View Donations
              </button>

              <button onClick={() => setPage("mydonations")}>
                ❤️ My Donations
              </button>
            </>
          )}

          {/* ================= NGO ================= */}

          {role === "NGO" && (
            <>
              <button onClick={() => setPage("view")}>
                📦 View Donations
              </button>

              <button
                onClick={() =>
                  setPage("myClaimedDonations")
                }
              >
                📋 My Claimed Donations
              </button>
            </>
          )}

          {/* ================= VOLUNTEER ================= */}

          {role === "VOLUNTEER" && (
            <>
              <button onClick={() => setPage("volunteer")}>
                🚚 My Deliveries
              </button>
            </>
          )}

          {/* ================= ADMIN ================= */}

          {role === "ADMIN" && (
            <>
              <button onClick={() => setPage("view")}>
                🍱 Manage Donations
              </button>

              <button onClick={() => setPage("users")}>
                👥 Manage Users
              </button>

              <button onClick={() => setPage("analytics")}>
                📊 Analytics
              </button>

              <button onClick={() => setPage("assign")}>
                🚚 Assign Volunteer
              </button>

              <button onClick={() => setPage("ngoApprovals")}>
                🏢 NGO Approvals
              </button>
            </>
          )}

          {/* ================= ACCOUNT ================= */}

          <h4>ACCOUNT</h4>

          <button onClick={() => setPage("profile")}>
            👤 Profile
          </button>

        </div>
      </div>

      {/* Bottom Section */}

      <div className="bottom">

        <div className="user">
          👋 {name}
        </div>

        <button
          className="logout"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;
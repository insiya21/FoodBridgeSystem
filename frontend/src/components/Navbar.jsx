function Navbar({ setPage }) {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav
      style={{
        backgroundColor: "#2E7D32",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <h2>🍱 FoodBridge</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Dashboard for everyone */}
        <button onClick={() => setPage("dashboard")}>
          Dashboard
        </button>

        {/* ================= DONOR ================= */}
        {role === "DONOR" && (
          <>
            <button onClick={() => setPage("donate")}>
              Donate Food
            </button>

            <button onClick={() => setPage("view")}>
              View Donations
            </button>

            <button onClick={() => setPage("mydonations")}>
              My Donations
            </button>
          </>
        )}

        {/* ================= NGO ================= */}
        {role === "NGO" && (
          <>
            <button onClick={() => setPage("view")}>
              View Donations
            </button>

            <button onClick={() => setPage("claimed")}>
              My Claimed Food
            </button>
          </>
        )}

        {/* ================= VOLUNTEER ================= */}
        {role === "VOLUNTEER" && (
          <>
            <button onClick={() => setPage("volunteer")}>
              Volunteer Dashboard
            </button>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "ADMIN" && (
          <>
            <button onClick={() => setPage("view")}>
              Manage Donations
            </button>

            <button onClick={() => setPage("users")}>
              Manage Users
            </button>

            <button onClick={() => setPage("analytics")}>
              Analytics
            </button>

            <button onClick={() => setPage("assign")}>
              Assign Volunteer
            </button>
          </>
        )}

        {/* Profile for everyone */}
        <button onClick={() => setPage("profile")}>
          Profile
        </button>

        {/* Welcome */}
        <span
          style={{
            fontWeight: "bold",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          👋 {name} ({role})
        </span>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
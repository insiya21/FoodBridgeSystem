import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://foodbridgesystem.onrender.com/api/users"
      );

      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://foodbridgesystem.onrender.com/api/users/${id}`
      );

      toast.success("User Deleted Successfully!");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  const ngoCount = users.filter(
    (u) => u.role === "NGO"
  ).length;

  const donorCount = users.filter(
    (u) => u.role === "DONOR"
  ).length;

  const volunteerCount = users.filter(
    (u) => u.role === "VOLUNTEER"
  ).length;

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.role
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const styles = {
      ADMIN: {
        background: "#FEE2E2",
        color: "#DC2626",
      },
      DONOR: {
        background: "#DCFCE7",
        color: "#16A34A",
      },
      NGO: {
        background: "#DBEAFE",
        color: "#2563EB",
      },
      VOLUNTEER: {
        background: "#EDE9FE",
        color: "#7C3AED",
      },
    };

    return (
      <span
        style={{
          ...styles[role],
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {role}
      </span>
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "32px",
          color: "#111827",
          marginBottom: "8px",
        }}
      >
      👥 Manage Users ({users.length})      </h1>

      <p
        style={{
          color: "#6B7280",
          marginBottom: "25px",
        }}
      >
        Manage all registered users in FoodBridge.
      </p>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <StatCard
          icon="👥"
          title="Total Users"
          value={users.length}
        />

        <StatCard
          icon="🏢"
          title="NGOs"
          value={ngoCount}
        />

        <StatCard
          icon="❤️"
          title="Donors"
          value={donorCount}
        />

        <StatCard
          icon="🚚"
          title="Volunteers"
          value={volunteerCount}
        />
      </div>

      {/* Search */}

      <div
        style={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "15px",
            top: "12px",
            color: "#6B7280",
          }}
        >
          🔍
        </span>

        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px 12px 12px 45px",
            borderRadius: "12px",
            border: "1px solid #D1D5DB",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Users */}

      <div
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "12px 15px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                background:
                user.role === "ADMIN"
                    ? "#EF4444"
                    : user.role === "NGO"
                    ? "#3B82F6"
                    : user.role === "DONOR"
                    ? "#22C55E"
                    : "#8B5CF6",                  
                    color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "20px",
                  }}
                >
                  {user.name}
                </h3>

                <p
                  style={{
                    margin: "5px 0",
                    color: "#6B7280",
                  }}
                >
                  {user.email}
                </p>

                {getRoleBadge(user.role)}
              </div>
            </div>

            {user.role !== "ADMIN" && (
              <button
                onClick={() =>
                  deleteUser(user.id)
                }
                style={{
  background: "#EF4444",
  color: "white",
  border: "none",
  borderRadius: "10px",
  minWidth: "70px",
  height: "30px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
}}
              >
                🗑 Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "18px",
        textAlign: "center",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          marginBottom: "8px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          color: "#111827",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          marginTop: "5px",
          color: "#6B7280",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default ManageUsers;
import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchDonations();
    fetchRecentDonations();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
"https://foodbridgesystem.onrender.com/api/users"      );

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get(
        "https://foodbridgesystem.onrender.com/api/donations"
      );

      setDonations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentDonations = async () => {
    try {
      const response = await axios.get(
        "https://foodbridgesystem.onrender.com/api/donations/recent"
      );

      setRecentDonations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalUsers = users.length;
  const totalDonations = donations.length;

  const available = donations.filter(
    (d) => d.status === "AVAILABLE"
  ).length;

  const claimed = donations.filter(
    (d) => d.status === "CLAIMED"
  ).length;

  const assigned = donations.filter(
    (d) => d.status === "ASSIGNED"
  ).length;

  const delivered = donations.filter(
    (d) => d.status === "DELIVERED"
  ).length;

  const StatCard = ({ icon, title, value }) => (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "18px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          marginBottom: "8px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          color: "#111827",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          marginTop: "5px",
          color: "#6B7280",
          fontSize: "14px",
        }}
      >
        {title}
      </p>
    </div>
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          fontSize: "43px",
          marginBottom: "8px",
          color: "#111827",
        }}
      >
        📊 Analytics Dashboard
      </h1>

      <p
        style={{
          color: "#64748B",
          marginBottom: "35px",
          fontSize: "22px",
        }}
      >
        Monitor FoodBridge activity and impact.
      </p>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "18px",
          marginBottom: "35px",
        }}
      >
        <StatCard
          icon="👥"
          title="Total Users"
          value={totalUsers}
        />

        <StatCard
          icon="🍱"
          title="Donations"
          value={totalDonations}
        />

        <StatCard
          icon="📦"
          title="Available"
          value={available}
        />

        <StatCard
          icon="🤝"
          title="Claimed"
          value={claimed}
        />

        <StatCard
          icon="🚚"
          title="Assigned"
          value={assigned}
        />

        <StatCard
          icon="✅"
          title="Delivered"
          value={delivered}
        />
      </div>

      {/* Recent Activity */}

      <div
        style={{
          background: "white",
          borderRadius: "18px",
          padding: "25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Recent Activity
        </h2>

        {recentDonations.length === 0 ? (
          <p>No recent donations found.</p>
        ) : (
          recentDonations.map((donation) => (
            <div
              key={donation.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 0",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  🍱 {donation.foodName}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                  }}
                >
                  Donor: {donation.donorName}
                </div>

                {donation.claimedBy && (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6B7280",
                    }}
                  >
                    NGO: {donation.claimedBy}
                  </div>
                )}
              </div>

              <span
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "#EEF2FF",
                  color: "#6366F1",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                {donation.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Analytics;
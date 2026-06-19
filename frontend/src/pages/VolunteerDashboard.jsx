import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function VolunteerDashboard() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  const volunteerName = localStorage.getItem("name");

  useEffect(() => {
    fetchMyAssignments();
  }, []);

  const fetchMyAssignments = async () => {
    try {
      const response = await axios.get(
        `https://foodbridgesystem.onrender.com/api/donations/volunteer/${encodeURIComponent(
          volunteerName
        )}`
      );

      setDonations(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load deliveries");
    }
  };

  const markDelivered = async (id) => {
    try {
      await axios.put(
        `https://foodbridgesystem.onrender.com/api/donations/deliver/${id}`
      );

      toast.success("Donation Delivered Successfully");

      fetchMyAssignments();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const filtered = donations.filter((d) =>
    d.foodName.toLowerCase().includes(search.toLowerCase())
  );

  const assigned = donations.filter(
    (d) => d.status === "ASSIGNED"
  ).length;

  const delivered = donations.filter(
    (d) => d.status === "DELIVERED"
  ).length;

  const pending = assigned;

  return (
    <div>

      <h1
        style={{
          fontSize: "35px",
          marginBottom: "10px",
          marginLeft: "15px",
        }}
      >
        🚚 Volunteer Dashboard
      </h1>

      <p
        style={{
          color: "#64748B",
          marginBottom: "30px",
          fontSize: "17px",
          marginLeft: "15px",
        }}
      >
        Manage your assigned deliveries and help people.
      </p>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="Assigned"
          value={assigned}
          icon="📦"
        />

        <StatCard
          title="Delivered"
          value={delivered}
          icon="✅"
        />

        <StatCard
          title="Total"
          value={donations.length}
          icon="🚚"
        />
      </div>

      <input
        type="text"
        placeholder="🔍 Search Food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "320px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          marginBottom: "25px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 5px 18px rgba(0,0,0,0.08)",
        }}
      >
        <thead
          style={{
            background:
              "linear-gradient(90deg,#5B5FEF,#7C5CFA)",
            color: "white",
          }}
        >
          <tr>
            <th style={th}>Photo</th>
            <th style={th}>Food</th>
            <th style={th}>Qty</th>
           <th style={th}>Donor</th>
           <th style={th}>Contact</th>
            <th style={th}>Pickup Address</th>
            <th style={th}>NGO</th>
            <th style={th}>NGO Address</th>
            <th style={th}>Status</th>
            <th style={th}>Delivered At</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((d) => (
            <tr key={d.id}>

                <td style={td}>
  {d.imageUrl ? (
    <img
      src={d.imageUrl}
      alt={d.foodName}
      style={{
        width: "170px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
  ) : (
    "No Image"
  )}
</td>
              <td style={td}>{d.foodName}</td>

              <td style={td}>{d.quantity}</td>

              <td style={td}>{d.donorName}</td>

              <td style={td}>
  <a
    href={`tel:${d.contactNumber}`}
    style={{
      color: "#2563EB",
      textDecoration: "none",
      fontWeight: "600",
    }}
  >
    {d.contactNumber}
  </a>
</td>

                <td style={td}>
  <div>{d.pickupAddress}</div>

  <button
    onClick={() =>
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          d.pickupAddress
        )}`,
        "_blank"
      )
    }
    style={{
      marginTop: "8px",
      background: "#2563EB",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "8px",
      cursor: "pointer",
      width: "110px",
    }}
  >
    📍 Pickup Map
  </button>
</td>

                <td style={td}>{d.claimedBy}</td>

               <td style={td}>
  <div>{d.ngoAddress || "Not Available"}</div>

  {d.ngoAddress && (
    <button
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            d.ngoAddress
          )}`,
          "_blank"
        )
      }
      style={{
        marginTop: "8px",
        background: "#16A34A",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "8px",
        cursor: "pointer",
        width: "90px",
        fontSize: "12px",
      }}
    >
      📍 NGO Map
    </button>
  )}
</td>

                <td style={td}>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background:
                      d.status === "DELIVERED"
                        ? "#DCFCE7"
                        : "#DBEAFE",
                    color:
                      d.status === "DELIVERED"
                        ? "#15803D"
                        : "#2563EB",
                    fontWeight: "600",
                  }}
                >
                  {d.status}
                </span>
              </td>

              <td style={td}>
                {d.deliveredAt ? (
                    <span
                    style={{
                        color: "#16A34A",
                        fontWeight: "600",
                    }}
                    >
                    {d.deliveredAt}
                    </span>
                ) : (
                    "-"
                )}
                </td>

              <td style={td}>
                {d.status === "ASSIGNED" ? (
                  <button
                    onClick={() =>
                      markDelivered(d.id)
                    }
                    style={{
                      background:
                        "linear-gradient(90deg,#5B5FEF,#7C5CFA)",
                      color: "white",
                      padding: "9px 18px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Mark Delivered
                  </button>
                ) : (
                  <span
                    style={{
                      color: "#16A34A",
                      fontWeight: "600",
                    }}
                  >
                    ✅ Completed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#64748B",
            fontSize: "18px",
          }}
        >
          🚚 No deliveries assigned.
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <div
        style={{
          fontSize: "30px",
        }}
      >
        {icon}
      </div>

      <div>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

const th = {
  padding: "18px",
  textAlign: "center",
  backgroundColor: "#6C63FF",
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: "16px",
};

const td = {
  padding: "18px",
  textAlign: "center",
};

export default VolunteerDashboard;
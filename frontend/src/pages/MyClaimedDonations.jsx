import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MyClaimedDonations() {
  const [previewImage, setPreviewImage] = useState(null);
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  const ngoName = localStorage.getItem("name");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {

    try {

      const response = await axios.get(
        `https://foodbridgesystem.onrender.com/api/donations/claimed/${encodeURIComponent(ngoName)}`
      );

      setDonations(response.data);

    } catch (error) {

      console.error(error);
      toast.error("Failed to load donations");

    }

  };

  const filtered = donations.filter((d) =>
    d.foodName.toLowerCase().includes(search.toLowerCase())
  );

  const badge = (status) => {

    switch (status) {

      case "CLAIMED":
        return {
          background: "#FEF3C7",
          color: "#92400E",
        };

      case "ASSIGNED":
        return {
          background: "#DBEAFE",
          color: "#1D4ED8",
        };

      case "DELIVERED":
        return {
          background: "#DCFCE7",
          color: "#15803D",
        };

      default:
        return {
          background: "#E5E7EB",
          color: "#374151",
        };

    }

  };

  return (

    <div>

      <h1
        style={{
          fontSize: "55px",
          marginBottom: "25px",
        }}
      >
        📦 My Claimed Donations
      </h1>

      <input
        type="text"
        placeholder="🔍 Search Food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "320px",
          padding: "14px 18px",
          marginBottom: "30px",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          outline: "none",
          fontSize: "15px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      />

     <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#FFFFFF",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          marginTop: "10px",
        }}
      >

      <thead>
  <tr
    style={{
      background: "linear-gradient(90deg, #5B5FEF, #7C5CFA)",
    }}
  >
    <th style={th}>Photo</th>
    <th style={th}>Food</th>
    <th style={th}>Qty</th>
    <th style={th}>Donor</th>
    <th style={th}>Pickup</th>
    <th style={th}>Volunteer</th>
    <th style={th}>Delivered At</th>
    <th style={th}>Status</th>
  </tr>
</thead>

        <tbody>

          {filtered.map((d) => (

          <tr
            key={d.id}
            style={{
              transition: "0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F8FAFC";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
            }}
          >

            <td style={td}>
              {d.imageUrl ? (
                <img
                  src={d.imageUrl}
                  alt={d.foodName}
                  onClick={() => setPreviewImage(d.imageUrl)}
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                "No Image"
              )}
            </td>

              <td style={td}>{d.foodName}</td>

              <td style={td}>{d.quantity}</td>

              <td style={td}>{d.donorName}</td>

              <td style={td}>{d.pickupAddress}</td>

              <td style={td}>
  {d.assignedVolunteer ? (
    <span
      style={{
        background: "#E0F2FE",
        color: "#0369A1",
        padding: "7px 16px",
        borderRadius: "999px",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      👤 {d.assignedVolunteer}
    </span>
  ) : (
    <span
      style={{
        background: "#F3F4F6",
        color: "#6B7280",
        padding: "7px 16px",
        borderRadius: "999px",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      Pending
    </span>
  )}
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
  <span
    style={{
      ...badge(d.status),
      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "600",
    }}
  >
    {d.status}
  </span>
</td>

            </tr>

          ))}

        </tbody>

      </table>

      {previewImage && (
  <div
    onClick={() => setPreviewImage(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <img
      src={previewImage}
      alt="Preview"
      style={{
        maxWidth: "80%",
        maxHeight: "80%",
        borderRadius: "15px",
      }}
    />
  </div>
)}

    </div>

  );

}

const th = {
  padding: "18px",
  textAlign: "center",
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "700",
  background: "#5B5FEF", // add this
};

const td = {
  padding: "18px",
  textAlign: "center",
  borderBottom: "1px solid #F1F5F9",
  color: "#1F2937",
  fontSize: "15px",
};

const thStyle = {
  padding: "18px",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "700",
  color: "white",
};

const tdStyle = {
  padding: "18px",
  textAlign: "center",
  fontSize: "15px",
  color: "#1F2937",
};

export default MyClaimedDonations;
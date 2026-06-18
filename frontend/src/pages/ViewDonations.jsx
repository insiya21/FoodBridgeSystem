  import { useEffect, useState } from "react";
  import axios from "axios";
  import { toast } from "react-toastify";

  function ViewDonations() {
    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    useEffect(() => {
      fetchDonations();
    }, []);

    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/donations"
        );

        setDonations(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load donations");
      }
    };

    const claimFood = async (id) => {
      try {
        await axios.put(
          `http://localhost:8080/api/donations/claim/${id}`,
          {},
          {
            params: {
              claimedBy: name,
            },
          }
        );

        toast.success("Food Claimed Successfully!");

        fetchDonations();
      } catch (error) {
        console.error(error);
        toast.error("Failed to claim food");
      }
    };

    const filteredDonations = donations.filter((donation) =>
      donation.foodName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    const getStatusStyle = (status) => {
      switch (status) {
        case "AVAILABLE":
          return {
            background: "#DCFCE7",
            color: "#15803D",
          };

        case "CLAIMED":
          return {
            background: "#FEF3C7",
            color: "#B45309",
          };

          case "EXPIRED":
  return {
    background: "#FEE2E2",
    color: "#DC2626",
  };

        case "DELIVERED":
          return {
            background: "#DBEAFE",
            color: "#1D4ED8",
          };

        default:
          return {
            background: "#E5E7EB",
            color: "#374151",
          };
      }
    };

    return (
      <div style={{ padding: "30px" }}>

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "25px",
          }}
        >
          🍱 Food Donations
        </h1>

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "350px",
              padding: "12px 18px",
              borderRadius: "10px",
              border: "1px solid #D1D5DB",
              fontSize: "15px",
            }}
          />
        </div>

        <table
          style={{
            width: "100%",
            background: "white",
            borderCollapse: "collapse",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <thead>
            <tr>

              <th style={thStyle}>Photo</th>

              <th style={thStyle}>Food</th>

              <th style={thStyle}>Qty</th>

              <th style={thStyle}>Category</th>

              <th style={thStyle}>Donor</th>

              <th style={thStyle}>Location</th>

              <th style={thStyle}>Status</th>

              <th style={thStyle}>Claimed By</th>

              <th style={thStyle}>Volunteer</th>

              <th style={thStyle}>Action</th>

            </tr>
          </thead>

          <tbody>

            {filteredDonations.map((donation) => (

              <tr key={donation.id}>

  <td style={tdStyle}>
    {donation.imageUrl ? (
      <img
  src={donation.imageUrl}
  alt={donation.foodName}
  onClick={() =>
    setPreviewImage(donation.imageUrl)
  }
  style={{
    width: "120px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
  }}
/>
    ) : (
      "No Image"
    )}
  </td>

  <td style={tdStyle}>
    {donation.foodName}
  </td>

                <td style={tdStyle}>
                  {donation.quantity}
                </td>

                <td style={tdStyle}>
                  {donation.category}
                </td>

                <td style={tdStyle}>
  {donation.donorName}
</td>

<td style={tdStyle}>
  <div>{donation.pickupAddress}</div>

 <button
  onClick={() =>
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        donation.pickupAddress
      )}`,
      "_blank"
    )
  }
  style={{
    marginTop: "10px",
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "5px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "13px",
    width: "120px",
  }}
>
  📍 View on Map
</button>

</td>

<td style={tdStyle}>

                  <span
                    style={{
                      ...getStatusStyle(donation.status),
                      padding: "7px 14px",
                      borderRadius: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {donation.status}
                  </span>

                </td>

                <td style={tdStyle}>
                  {donation.claimedBy || "-"}
                </td>

                <td style={tdStyle}>
                  {donation.assignedVolunteer || "-"}
                </td>

                <td style={tdStyle}>

                 {role === "NGO" &&
donation.status === "AVAILABLE" ? (

  <button
    onClick={() => claimFood(donation.id)}
    style={{
      background: "#22C55E",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Claim
  </button>

) : donation.status === "EXPIRED" ? (

  <button
    disabled
    style={{
      background: "#EF4444",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "not-allowed",
      fontWeight: "600",
    }}
  >
    Expired
  </button>

) : (

  <button
    disabled
    style={{
      background: "#9CA3AF",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "not-allowed",
      fontWeight: "600",
    }}
  >
    {donation.status}
  </button>

)}            
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

  /* ===========================
    Table Styles
  =========================== */

  const thStyle = {
    padding: "18px",
    textAlign: "center",
    backgroundColor: "#6C63FF",
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: "16px",
    border: "none",
  };

  const tdStyle = {
    padding: "18px",
    textAlign: "center",
    borderBottom: "1px solid #E5E7EB",
    fontSize: "15px",
    color: "#111827",
  };

  export default ViewDonations;
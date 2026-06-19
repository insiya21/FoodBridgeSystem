import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditDonation from "./EditDonation";

function MyDonations() {
  const [donations, setDonations] = useState([]);
const [selectedDonation, setSelectedDonation] = useState(null);
const [previewImage, setPreviewImage] = useState(null);
const donorEmail = localStorage.getItem("email");
  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      // If you have /donor/{name} endpoint, use this:
      const response = await axios.get(
  `https://foodbridgesystem.onrender.com/api/donations/donor/${encodeURIComponent(
    donorEmail
  )}`
);

      setDonations(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load donations");
    }
  };

  const deleteDonation = async (id) => {

    if (!window.confirm("Delete this donation?")) {
      return;
    }

    try {

      await axios.delete(
        `https://foodbridgesystem.onrender.com/api/donations/${id}`
      );

      toast.success("Donation deleted successfully");

      fetchMyDonations();

    } catch (error) {

      console.error(error);

      toast.error("Delete failed");

    }

  };

  const getStatusColor = (status) => {

    switch (status) {

      case "AVAILABLE":
        return "#22C55E";

      case "CLAIMED":
        return "#F59E0B";

      case "DELIVERED":
        return "#3B82F6";

      default:
        return "#6B7280";
    }

  };

  return (

    <div
      style={{
        padding: "30px",
      }}
    >

      <h1
          style={{
            color: "#111827",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "25px",
          }}
        >
      My Donations
    </h1>

      {donations.length === 0 ? (

        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >

          <h2>No Donations Yet</h2>

          <p>
            Start donating food to see your history here.
          </p>

        </div>

      ) : (

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >

          <thead
            style={{
              background: "#6C63FF",
              color: "white",
            }}
          >

            <tr>

              <th style={thStyle}>Photo</th>

              <th style={thStyle}>Food</th>

              <th style={thStyle}>Qty</th>

              <th style={thStyle}>Category</th>

              <th style={thStyle}>Pickup</th>

              <th style={thStyle}>Expiry</th>

              <th style={thStyle}>Status</th>

              <th style={thStyle}>Actions</th>

            </tr>

          </thead>

          <tbody>

            {donations.map((donation) => (

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
                  {donation.pickupAddress}
                </td>

                <td style={tdStyle}>
                  {donation.expiryTime}
                </td>

                <td style={tdStyle}>

                  <span
                    style={{
                      background: getStatusColor(
                        donation.status
                      ),
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {donation.status}
                  </span>

                </td>

                <td style={tdStyle}>

                                  <button
                    onClick={() => setSelectedDonation(donation)}
                    style={{
                      background: "#3B82F6",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "8px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteDonation(donation.id)}
                    style={{
                      background: "#EF4444",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* Edit Donation Popup */}

      {selectedDonation && (

        <EditDonation
          donation={selectedDonation}
          refresh={fetchMyDonations}
          onClose={() => setSelectedDonation(null)}
        />

      )}

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
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.4)",
      }}
    />
  </div>
)}

    </div>

  );

}

const thStyle = {
  padding: "18px",
  textAlign: "center",
  background: "#6C63FF",
  color: "#FFFFFF",      // Force white text
  fontWeight: "700",
  fontSize: "16px",
};

const tdStyle = {
  padding: "15px",
  textAlign: "center",
  borderBottom: "1px solid #E5E7EB",
};

export default MyDonations;
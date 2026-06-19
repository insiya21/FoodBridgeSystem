import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AssignVolunteer() {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState({});
  const [volunteerList, setVolunteerList] = useState([]);

  useEffect(() => {
    fetchClaimedDonations();
    fetchVolunteers();
  }, []);

  const fetchClaimedDonations = async () => {
    try {
      const response = await axios.get(
        "https://foodbridgesystem.onrender.com/api/donations"
      );

      const claimedDonations = response.data.filter(
        (donation) => donation.status === "CLAIMED"
      );

      setDonations(claimedDonations);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load donations");
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(
        "https://foodbridgesystem.onrender.com/api/users/volunteers"
      );

      setVolunteerList(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load volunteers");
    }
  };

  const handleVolunteerChange = (id, value) => {
    setVolunteers({
      ...volunteers,
      [id]: value,
    });
  };

  const assignVolunteer = async (id) => {
    const volunteerName = volunteers[id];

    if (!volunteerName) {
      toast.error("Please select a volunteer");
      return;
    }

    try {
      await axios.put(
        `https://foodbridgesystem.onrender.com/api/donations/assign/${id}`,
        {},
        {
          params: {
            volunteerName,
          },
        }
      );

      toast.success("Volunteer Assigned Successfully!");

      fetchClaimedDonations();
    } catch (error) {
      console.error(error);
      toast.error("Assignment Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "8px",
        }}
      >
        🚚 Assign Volunteer
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginBottom: "25px",
          fontSize: "15px",
        }}
      >
        Assign volunteers to claimed donations.
      </p>

      {donations.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          No claimed donations available.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {donations.map((donation) => (
            <div
              key={donation.id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "22px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  color: "#111827",
                  marginBottom: "12px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                🍱 {donation.foodName}
              </h3>

              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    background: "#FEF3C7",
                    color: "#92400E",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  CLAIMED
                </span>
              </div>

              <div
                style={{
                  color: "#4B5563",
                  lineHeight: "1.8",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <strong>Quantity:</strong>{" "}
                  {donation.quantity} Meals
                </div>

                <div>
                  <strong>Donor:</strong>{" "}
                  {donation.donorName}
                </div>

                <div>
                  <strong>NGO:</strong>{" "}
                  {donation.claimedBy}
                </div>
              </div>

              <select
                value={volunteers[donation.id] || ""}
                onChange={(e) =>
                  handleVolunteerChange(
                    donation.id,
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  marginBottom: "18px",
                  fontSize: "15px",
                }}
              >
                <option value="">
                  Select Volunteer
                </option>

                {volunteerList.map((volunteer) => (
                  <option
                    key={volunteer.id}
                    value={volunteer.name}
                  >
                    {volunteer.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  assignVolunteer(donation.id)
                }
                style={{
                  width: "220px",
                  display: "block",
                  margin: "0 auto",
                  padding: "12px",
                  background: "#6366F1",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                Assign Volunteer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignVolunteer;
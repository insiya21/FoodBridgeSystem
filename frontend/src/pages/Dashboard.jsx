import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

  function Dashboard({ setPage }) {

  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    totalDonations: 0,
    totalNGOs: 0,
    totalVolunteers: 0,
    mealsSaved: 0,
  });

  const [recentDonations, setRecentDonations] = useState([]);
  
  useEffect(() => {
    fetchStats();
    fetchRecentDonations();
  }, []);

const fetchStats = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/donations/stats"
    );

    setStats(response.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchRecentDonations = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/donations/recent"
    );

    setRecentDonations(response.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="dashboard">
      <div className="dashboard-container">

        {/* Welcome Banner */}

        <div className="welcome-card">

          <div className="welcome-text">

            <h1>
              {role === "DONOR" && (
                <>
                  Reduce Food Waste.
                  <br />
                  Feed More Lives.
                </>
              )}

              {role === "NGO" && (
                <>
                  Claim Food.
                  <br />
                  Help Communities.
                </>
              )}

              {role === "VOLUNTEER" && (
                <>
                  Deliver Hope.
                  <br />
                  Save Lives.
                </>
              )}

              {role === "ADMIN" && (
                <>
                  Manage FoodBridge.
                  <br />
                  Monitor Impact.
                </>
              )}
            </h1>

            <p>
              {role === "DONOR" &&
                "Every meal you donate can make someone's day better. Keep reducing food waste and spreading kindness."}

              {role === "NGO" &&
                "Browse available donations and claim food for the people you serve."}

              {role === "VOLUNTEER" &&
                "Pick up food from donors and deliver it safely to NGOs."}

              {role === "ADMIN" &&
                "Manage users, donations and volunteers from one place."}
            </p>

            {/* Hero Button */}

            {role === "DONOR" && (
              <button
                className="donate-btn"
                onClick={() => setPage("donate")}
              >
                ➕ Donate Food
              </button>
            )}

            {role === "NGO" && (
              <button
                className="donate-btn"
                onClick={() => setPage("view")}
              >
                📦 View Donations
              </button>
            )}

            {role === "VOLUNTEER" && (
              <button
                className="donate-btn"
                onClick={() => setPage("volunteer")}
              >
                🚚 Volunteer Dashboard
              </button>
            )}

            {role === "ADMIN" && (
              <button
                className="donate-btn"
                onClick={() => setPage("analytics")}
              >
                📊 View Analytics
              </button>
            )}

          </div>

          <div className="welcome-image">
            <img
              src="/foodbridge-logo.png"
              alt="FoodBridge"
            />
          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card donations">
            <div className="stat-icon">🍱</div>
            <div>
              <h2>{stats.totalDonations}</h2>
              <p>Total Donations</p>
            </div>
          </div>

          <div className="stat-card ngos">
            <div className="stat-icon">🏢</div>
            <div>
              <h2>{stats.totalNGOs}</h2>
              <p>NGO Partners</p>
            </div>
          </div>

          <div className="stat-card volunteers">
            <div className="stat-icon">🚚</div>
            <div>
              <h2>{stats.totalVolunteers}</h2>
              <p>Volunteers</p>
            </div>
          </div>

          <div className="stat-card meals">
            <div className="stat-icon">❤️</div>
            <div>
              <h2>{stats.mealsSaved}</h2>
              <p>Meals Saved</p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}

        <div className="bottom-grid">

          {/* Recent Donations */}

          <div className="panel">

            <h2>Recent Donations</h2>

           {recentDonations.map((donation) => (
              <div
                key={donation.id}
                className="donation-item"
              >
                <span>
                  🍱 {donation.foodName}
                </span>

                <span className="status pending">
                  {donation.status}
                </span>
              </div>
        ))}
          </div>

          {/* Quick Actions */}

          <div className="panel">

            <h2>Quick Actions</h2>

            {/* DONOR */}

            {role === "DONOR" && (
              <>
                <button
                  className="action-btn"
                  onClick={() => setPage("donate")}
                >
                  ➕ Add Donation
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("mydonations")}
                >
                  ❤️ My Donations
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("view")}
                >
                  📦 View Donations
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("profile")}
                >
                  👤 Profile
                </button>
              </>
            )}

            {/* NGO */}

            {role === "NGO" && (
              <>
                <button
                  className="action-btn"
                  onClick={() => setPage("view")}
                >
                  📦 View Donations
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("myClaimedDonations")}
                >
                  📋 My Claimed Donations
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("profile")}
                >
                  👤 Profile
                </button>
              </>
            )}

            {/* VOLUNTEER */}

            {role === "VOLUNTEER" && (
              <>
                <button
                  className="action-btn"
                  onClick={() => setPage("volunteer")}
                >
                  🚚 Volunteer Dashboard
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("profile")}
                >
                  👤 Profile
                </button>
              </>
            )}

            {/* ADMIN */}

            {role === "ADMIN" && (
              <>
                <button
                  className="action-btn"
                  onClick={() => setPage("users")}
                >
                  👥 Manage Users
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("ngoApprovals")}
                >
                  🏢 NGO Approvals
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("analytics")}
                >
                  📊 Analytics
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("assign")}
                >
                  🚚 Assign Volunteer
                </button>

                <button
                  className="action-btn"
                  onClick={() => setPage("profile")}
                >
                  👤 Profile
                </button>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DonateFood from "./pages/DonateFood";
import ViewDonations from "./pages/ViewDonations";
import MyDonations from "./pages/MyDonations";
import MyClaimedDonations from "./pages/MyClaimedDonations";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AssignVolunteer from "./pages/AssignVolunteer";
import ManageUsers from "./pages/ManageUsers";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import AdminNgoApprovals from "./pages/AdminNgoApprovals";
import Layout from "./components/Layout";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [page, setPage] = useState("dashboard");

  // ===========================
  // NOT LOGGED IN
  // ===========================

  if (!token) {
    if (showLogin) {
      return (
        <>
          <Login
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />

          <ToastContainer position="top-right" autoClose={3000} />
        </>
      );
    }

    if (showRegister) {
      return (
        <>
          <Register
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />

          <ToastContainer position="top-right" autoClose={3000} />
        </>
      );
    }

    return (
      <>
        <LandingPage
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />

        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  // ===========================
  // LOGGED IN
  // ===========================

  return (
    <>
      <Layout setPage={setPage}>

        {/* Dashboard */}

        {page === "dashboard" && (
          <Dashboard setPage={setPage} />
        )}

        {/* ================= DONOR ================= */}

        {role === "DONOR" && page === "donate" && (
          <DonateFood setPage={setPage} />
        )}

        {role === "DONOR" && page === "view" && (
          <ViewDonations />
        )}

        {role === "DONOR" && page === "mydonations" && (
          <MyDonations />
        )}

        {/* ================= NGO ================= */}

        {role === "NGO" && page === "view" && (
          <ViewDonations />
        )}

        {role === "NGO" && page === "myClaimedDonations" && (
          <MyClaimedDonations />
        )}

        {/* ================= VOLUNTEER ================= */}

        {role === "VOLUNTEER" && page === "volunteer" && (
          <VolunteerDashboard />
        )}

        {/* ================= ADMIN ================= */}

        {role === "ADMIN" && page === "view" && (
          <ViewDonations />
        )}

        {role === "ADMIN" && page === "users" && (
          <ManageUsers />
        )}

        {role === "ADMIN" && page === "analytics" && (
          <Analytics />
        )}

        {role === "ADMIN" && page === "assign" && (
          <AssignVolunteer />
        )}

        {role === "ADMIN" && page === "ngoApprovals" && (
          <AdminNgoApprovals />
        )}

        {/* ================= PROFILE ================= */}

        {page === "profile" && (
          <Profile />
        )}

      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;
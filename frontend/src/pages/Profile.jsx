import { useState } from "react";
import axios from "axios";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] =
  useState(false);
  const [user] = useState({
    name: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email") || "Not Available",
    role: localStorage.getItem("role") || "DONOR",
  });

  const initials = user.name
  ?.split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase();

  return (
    
    <div
      style={{
        padding: "10px 30px 30px 30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "900px",
          maxWidth: "100%",
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          marginTop: "0px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
      style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#6C63FF",
            color: "white",
            fontSize: "36px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
      >
  {initials}
</div>

        </div>

        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "35px",
            color: "#111827",
          }}
        >
          My Profile
        </h1>

        {/* Information */}
       <div
  style={{
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  }}
>
  <InfoRow label="Full Name" value={user.name} />

  <InfoRow label="Email" value={user.email} />

  <InfoRow
    label="Role"
    value={
      <span
        style={{
          background:
  user.role === "ADMIN"
    ? "#FEE2E2"
    : user.role === "DONOR"
    ? "#DCFCE7"
    : user.role === "NGO"
    ? "#DBEAFE"
    : "#EDE9FE",

color:
  user.role === "ADMIN"
    ? "#DC2626"
    : user.role === "DONOR"
    ? "#16A34A"
    : user.role === "NGO"
    ? "#2563EB"
    : "#7C3AED",
          padding: "6px 14px",
          borderRadius: "20px",
          fontWeight: "600",
        }}
      >
      {user.role === "ADMIN"
  ? "👑 ADMIN"
  : user.role === "DONOR"
  ? "🍱 DONOR"
  : user.role === "NGO"
  ? "🏢 NGO"
  : "🚚 VOLUNTEER"}
      </span>
    }
  />

<InfoRow
  label="Phone"
  value={
    localStorage.getItem("phoneNumber") ||
    "Not Added"
  }
/>

<InfoRow
  label="Address"
  value={
    localStorage.getItem("address") ||
    "Not Added"
  }
/>

  <InfoRow label="Member Since" value="2026" />
</div>

        {/* Buttons */}

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection:
              window.innerWidth <= 768
                ? "column"
                : "row",
                justifyContent: "center", 
            alignItems: "center",
            gap: "15px",
          }}
        >
         <button
  onClick={() => setShowEditModal(true)}
  style={{
    width: "190px",
    background: "#6C63FF",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  ✏ Edit Profile
</button>

          <button
  onClick={() => setShowPasswordModal(true)}
  style={{
              width: "190px",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🔒 Change Password
          </button>
        </div>
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          currentName={user.name}
          currentEmail={user.email}
        />
        <ChangePasswordModal
  isOpen={showPasswordModal}
  onClose={() =>
    setShowPasswordModal(false)
  }
/>
      </div>
    </div>
  );
}

/* ---------------------- */

function InfoRow({ label, value }) {
  return (
    <div
  style={{
    display: "flex",
    flexDirection: window.innerWidth <= 768 ? "column" : "row",
    alignItems: window.innerWidth <= 768 ? "flex-start" : "center",
    gap: "10px",
    padding: "16px 24px",
    background: "#F8FAFC",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
  }}
>
      {/* Label */}
      <div
        style={{
          fontWeight: "600",
          color: "#374151",
          fontSize: "17px",
        }}
      >
        {label}
      </div>

      {/* Value */}
      <div
        style={{
          color: "#111827",
          fontSize: "17px",
          fontWeight: "500",
          textAlign: "left",
          width: "100%",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default Profile;
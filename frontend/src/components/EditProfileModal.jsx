import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditProfileModal({
  isOpen,
  onClose,
  currentName,
  currentEmail,
}) {
  const [name, setName] = useState(currentName || "");
  const [email, setEmail] = useState(currentEmail || "");
  const [phoneNumber, setPhoneNumber] = useState(
  localStorage.getItem("phoneNumber") || ""
);
  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const id = localStorage.getItem("id");

      await axios.put(
  `http://localhost:8080/api/users/${id}`,
  {
    name,
    email,
    phoneNumber,
    password: "temp123456",
    role: localStorage.getItem("role")
  }
);

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
localStorage.setItem("email", email);
localStorage.setItem(
  "phoneNumber",
  phoneNumber
);

      toast.success("Profile Updated Successfully");
      window.location.reload();

    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Profile");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          ✏ Edit Profile
        </h2>

        <label>Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label>Email Address</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label>Phone Number</label>

        <input
        type="text"
        value={phoneNumber}
        onChange={(e) =>
            setPhoneNumber(e.target.value)
        }
        style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onClose}
            style={cancelBtn}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={saveBtn}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  boxSizing: "border-box",
};

const cancelBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  background: "#E5E7EB",
  cursor: "pointer",
};

const saveBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  background: "#6C63FF",
  color: "white",
  cursor: "pointer",
};

export default EditProfileModal;
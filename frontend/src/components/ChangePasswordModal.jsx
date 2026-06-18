import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ChangePasswordModal({
  isOpen,
  onClose,
}) {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  if (!isOpen) return null;

  const handleUpdatePassword = async () => {

    if (
      newPassword !== confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/users/change-password",
        {
          userId: Number(
            localStorage.getItem("id")
          ),
          currentPassword,
          newPassword,
        }
      );

      toast.success(
        "Password Changed Successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Change Password"
      );
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
        background:
          "rgba(0,0,0,0.5)",
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
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          🔒 Change Password
        </h2>

        <label>
          Current Password
        </label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <label>
          New Password
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <label>
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
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
            onClick={
              handleUpdatePassword
            }
            style={saveBtn}
          >
            Update Password
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

export default ChangePasswordModal;
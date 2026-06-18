import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const sendOtp = async () => {

    try {

      await axios.post(
        `http://localhost:8080/api/auth/forgot-password?email=${email}`
      );

      toast.success("OTP Sent Successfully");

    } catch (error) {

      console.log(error);

      toast.error("Failed to Send OTP");

    }

  };

  return (

    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        background: "white",
        padding: "30px",
        borderRadius: "15px",
      }}
    >

      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={sendOtp}
      >
        Send OTP
      </button>

    </div>
  );
}

export default ForgotPassword;
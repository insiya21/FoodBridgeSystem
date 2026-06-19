import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";

function Login({ setShowLogin, setShowRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showForgotPassword,
    setShowForgotPassword] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [otpSent,
    setOtpSent] =
    useState(false);

  const sendOtp = async () => {

    try {

      await axios.post(
        `https://foodbridgesystem.onrender.com/api/auth/forgot-password?email=${email}`
      );

      toast.success(
        "OTP Sent Successfully"
      );

      setOtpSent(true);

    } catch (error) {

      toast.error(
        error.response?.data ||
        "Failed to Send OTP"
      );

    }
  };

  const resetPassword = async () => {

    try {

      await axios.post(
        `https://foodbridgesystem.onrender.com/api/auth/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`
      );

      toast.success(
        "Password Reset Successful"
      );

      setShowForgotPassword(false);

      setOtp("");
      setNewPassword("");
      setOtpSent(false);

    } catch (error) {

      toast.error(
        error.response?.data ||
        "Password Reset Failed"
      );

    }
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://foodbridgesystem.onrender.com/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "id",
        response.data.id
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      localStorage.setItem(
        "address",
        response.data.address
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      toast.success(
        "Login Successful!"
      );

      window.location.reload();

    } catch (error) {

      toast.error(
        error.response?.data ||
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="login-left">

        <img
          src="/foodbridge-logo.png"
          alt="FoodBridge"
          className="login-logo"
        />

        <h1>Welcome to FoodBridge</h1>

        <p
          style={{
            color: "#FFFFFF",
          }}
        >
          Connecting food donors, NGOs and volunteers to reduce food waste
          and feed more lives.
        </p>

        <div className="login-features">
          <div>🍱 Donate surplus food easily</div>
          <div>🏢 Connect with trusted NGOs</div>
          <div>🚚 Coordinate volunteers instantly</div>
          <div>❤️ Make every meal count</div>
        </div>

      </div>

      {/* Right Side */}

      <div className="login-right">

       <div className="login-card">

  {showForgotPassword ? (

    <>
      <h2>Forgot Password 🔐</h2>

      <p className="subtitle">
        Reset your FoodBridge account password
      </p>

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
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />

      {!otpSent ? (

        <button
          onClick={sendOtp}
          className="login-submit"
        >
          Send OTP
        </button>

      ) : (

        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={resetPassword}
            className="login-submit"
          >
            Reset Password
          </button>
        </>
      )}

      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() => {
            setShowForgotPassword(false);
            setOtpSent(false);
            setOtp("");
            setNewPassword("");
          }}
          style={{
            border: "none",
            background: "none",
            color: "#6C63FF",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ← Back To Login
        </button>
      </p>
    </>

  ) : (

    <>

      <h2>Welcome Back 👋</h2>

      <p className="subtitle">
        Login to continue your FoodBridge journey
      </p>

      <form onSubmit={handleLogin}>

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        <p
          style={{
            textAlign: "right",
            marginBottom: "15px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setShowForgotPassword(true)
            }
            style={{
              border: "none",
              background: "none",
              color: "#6C63FF",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Forgot Password?
          </button>
        </p>

        <button
          type="submit"
          className="login-submit"
        >
          Login
        </button>

      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <button
        className="register-switch"
        onClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      >
        Create New Account
      </button>

      <p className="back-home">

        <button
          onClick={() =>
            setShowLogin(false)
          }
        >
          ← Back to Home
        </button>

      </p>

    </>

  )}

</div>

      </div>

    </div>
  );
}

export default Login;
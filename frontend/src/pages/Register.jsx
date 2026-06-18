import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { toast } from "react-toastify";

function Register({ setShowRegister, setShowLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "DONOR",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
      });

      toast.success("Registration Successful!");

      setShowRegister(false);
      setShowLogin(true);
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  return (
    <div className="register-page">
      {/* Left Side */}

      <div className="register-left">
        <img
          src="/foodbridge-logo.png"
          alt="FoodBridge"
          className="register-logo"
        />

        <h1>Join FoodBridge</h1>

        <p
          style={{
            color: "white",
          }}
        >
          Become a part of the movement that connects food donors,
          NGOs and volunteers to reduce food waste and feed more lives.
        </p>

        <div className="register-features">
          <div>🍱 Donate surplus food with ease</div>
          <div>🏢 Collaborate with trusted NGOs</div>
          <div>🚚 Volunteer and make an impact</div>
          <div>❤️ Every contribution saves lives</div>
        </div>
      </div>

      {/* Right Side */}

      <div className="register-right">
        <div className="register-card">

          <h2>Create Account ✨</h2>

          <p className="subtitle">
            Join the FoodBridge community today
          </p>

          <form onSubmit={handleRegister}>

            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
  <label>Address</label>

  <input
    type="text"
    name="address"
    placeholder="Enter Address"
    value={formData.address}
    onChange={handleChange}
    required
  />
</div>

<div className="input-group">
  <label>Phone Number</label>

  <input
    type="text"
    name="phone"
    placeholder="Enter Phone Number"
    value={formData.phone}
    onChange={handleChange}
    required
  />
</div>

            <div className="input-group">
              <label>Select Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="DONOR">Food Donor</option>
                <option value="NGO">NGO</option>
                <option value="VOLUNTEER">Volunteer</option>
              </select>
            </div>

            <button
              type="submit"
              className="register-submit"
            >
              Create Account
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="login-switch"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          >
            Already have an account? Login
          </button>

          <p className="back-home">
            <button
              onClick={() => setShowRegister(false)}
            >
              ← Back to Home
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
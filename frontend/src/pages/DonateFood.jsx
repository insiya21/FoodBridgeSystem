import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DonateFood({ setPage }) {
  const [uploading, setUploading] = useState(false);
  const [donation, setDonation] = useState({
  foodName: "",
  quantity: "",
  category: "",
  pickupAddress: "",
  imageUrl: "",
  expiryTime: "",
  description: "",
  donorName: localStorage.getItem("name") || "",
  donorEmail: localStorage.getItem("email") || "",
  contactNumber: ""
});

  const handleChange = (e) => {
    setDonation({
      ...donation,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append("file", file);

  try {

    setUploading(true);

    const response = await axios.post(
      "http://localhost:8080/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setDonation((prev) => ({
      ...prev,
      imageUrl: response.data.url,
    }));

    toast.success("Image Uploaded Successfully");

  } catch (error) {

    console.error(error);
    toast.error("Image Upload Failed");

  } finally {

    setUploading(false);

  }
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !donation.foodName ||
      !donation.quantity ||
      !donation.category ||
      !donation.pickupAddress ||
      !donation.expiryTime ||
      !donation.contactNumber
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/donations",
        donation
      );

      toast.success("Food Donation Added Successfully!");

      setDonation({
        foodName: "",
        quantity: "",
        category: "",
        pickupAddress: "",
        imageUrl: "",
        expiryTime: "",
        description: "",
        donorName: localStorage.getItem("name") || "",
        donorEmail: localStorage.getItem("email") || "",
        contactNumber: ""
      });

      // Wait 1.5 seconds, then go to My Donations
      setTimeout(() => {
        setPage("mydonations");
      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error("Failed to Add Donation");

    }

  };

  return (

    <div
      style={{
        maxWidth: "750px",
        margin: "20px auto",
        background: "#fff",
        padding: "10px 30px 30px 30px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "10px",
          color: "#111827",
        }}
      >
        🍱 Donate Food
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#64748B",
          marginBottom: "30px",
        }}
      >
        Share your extra food with people in need.
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={donation.foodName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={donation.quantity}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="category"
          value={donation.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Bakery">Bakery</option>
          <option value="Fruits">Fruits</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
        </select>

        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={donation.pickupAddress}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ marginBottom: "15px" }}>

  <label
    style={{
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
    }}
  >
    Upload Food Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
  />

  {uploading && (
    <p>Uploading image...</p>
  )}

  {donation.imageUrl && (
    <img
      src={donation.imageUrl}
      alt="Preview"
      style={{
        width: "200px",
        marginTop: "10px",
        borderRadius: "10px",
      }}
    />
  )}

</div>

       <div style={{ marginBottom: "15px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "#64748B",
            marginBottom: "-9x",
            fontWeight: "500",
            marginLeft: "10px"
          }}
        >
          Expiry Date & Time
        </div>

        <input
          type="datetime-local"
          name="expiryTime"
          value={donation.expiryTime}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

        <textarea
          name="description"
          placeholder="Description"
          value={donation.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px",
            resize: "none"
          }}
        />

        <input
          type="text"
          name="donorName"
          value={donation.donorName}
          readOnly
          style={{
            ...inputStyle,
            background: "#f5f5f5"
          }}
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={donation.contactNumber}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "15px",
            background: "#6C63FF",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          🍱 Donate Food
        </button>

      </form>

    </div>

  );

}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box"
};

export default DonateFood;
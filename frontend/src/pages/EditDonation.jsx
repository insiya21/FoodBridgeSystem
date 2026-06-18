import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditDonation({ donation, onClose, refresh }) {
  const [foodName, setFoodName] = useState(donation.foodName);
  const [quantity, setQuantity] = useState(donation.quantity);
  const [category, setCategory] = useState(donation.category);
  const [pickupAddress, setPickupAddress] = useState(donation.pickupAddress);
  const [expiryTime, setExpiryTime] = useState(donation.expiryTime);
  const [description, setDescription] = useState(donation.description);
  const [contactNumber, setContactNumber] = useState(donation.contactNumber);

  const updateDonation = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/donations/${donation.id}`,
        {
          foodName,
          quantity,
          category,
          pickupAddress,
          expiryTime,
          description,
          donorName: donation.donorName,
          contactNumber,
          status: donation.status,
        }
      );

      toast.success("Donation Updated Successfully!");

      refresh();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Donation");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>✏️ Edit Donation</h2>

      <input
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Food Name"
      />
      <br /><br />

      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <br /><br />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <br /><br />

      <input
        value={pickupAddress}
        onChange={(e) => setPickupAddress(e.target.value)}
        placeholder="Pickup Address"
      />
      <br /><br />

      <input
        value={expiryTime}
        onChange={(e) => setExpiryTime(e.target.value)}
        placeholder="Expiry Time"
      />
      <br /><br />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br /><br />

      <input
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        placeholder="Contact Number"
      />
      <br /><br />

      <button onClick={updateDonation}>
        Update
      </button>

      <button
        onClick={onClose}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditDonation;
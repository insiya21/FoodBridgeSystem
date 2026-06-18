import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminNgoApprovals() {

  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    fetchPendingNgos();
  }, []);

  const fetchPendingNgos = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/admin/pending-ngos"
      );

      setNgos(response.data);

    } catch (error) {

      console.log(error);
      toast.error("Failed to load NGOs");

    }
  };

  const approveNgo = async (id) => {

    try {

      await axios.put(
        `http://localhost:8080/api/admin/approve/${id}`
      );

      toast.success("NGO Approved");

      fetchPendingNgos();

    } catch (error) {

      toast.error("Approval Failed");

    }
  };

  const rejectNgo = async (id) => {

    try {

      await axios.put(
        `http://localhost:8080/api/admin/reject/${id}`
      );

      toast.success("NGO Rejected");

      fetchPendingNgos();

    } catch (error) {

      toast.error("Rejection Failed");

    }
  };

  return (
    <div>

      <h1
        style={{
          fontSize: "40px",
          marginBottom: "25px",
        }}
      >
        🏢 NGO Verification Requests
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >

        <thead>

          <tr
            style={{
              background:
                "linear-gradient(90deg,#5B5FEF,#7C5CFA)",
                        }}
          >
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Address</th>
            <th style={th}>Action</th>
          </tr>

        </thead>

        <tbody>

          {ngos.map((ngo) => (

            <tr key={ngo.id}>

              <td style={td}>{ngo.name}</td>

              <td style={td}>{ngo.email}</td>

              <td style={td}>{ngo.address}</td>

              <td style={td}>

                <button
                  onClick={() =>
                    approveNgo(ngo.id)
                  }
                  style={{
                    background: "#22C55E",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectNgo(ngo.id)
                  }
                  style={{
                    background: "#EF4444",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

const th = {
  padding: "18px",
  textAlign: "center",
  color: "white",
  fontSize: "16px",
  fontWeight: "700",
  backgroundColor: "#5B5FEF",
};

const td = {
  padding: "18px",
  textAlign: "center",
};

export default AdminNgoApprovals;
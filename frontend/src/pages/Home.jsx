function Home({ goToLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🍱 FoodBridge System</h1>

      <h2>Welcome to FoodBridge</h2>

      <p>
        Connecting Donors, NGOs and Volunteers to reduce food waste and help
        people in need.
      </p>

      <button
        onClick={goToLogin}
        style={{ marginRight: "10px" }}
      >
        Login
      </button>

      <button>
        Register
      </button>
    </div>
  );
}

export default Home;
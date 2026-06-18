import "./LandingPage.css";

function LandingPage({ setShowLogin, setShowRegister }) {
  return (
    <div className="landing">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="brand">

          <img
            src="/foodbridge-logo.png"
            alt="FoodBridge"
            className="brand-logo"
          />

          <span>FoodBridge</span>

        </div>

        <div className="nav-menu">

          <a href="#features">Features</a>

          <a href="#stats">Impact</a>

          <a href="#footer">Contact</a>

        </div>

        <button
          className="login-btn"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">

       <div className="hero-circle">

    <img
        src="/foodbridge-logo.png"
        alt="FoodBridge"
        className="hero-logo"
    />

</div>

        <div className="hero-badge">

          🌍 Fighting Hunger Together

        </div>

        <h1>

          Reduce Food Waste.
          <br />
          Feed More Lives.

        </h1>

        <p>

          FoodBridge connects food donors,
          NGOs and volunteers through one
          intelligent platform that ensures
          surplus food reaches people instead
          of landfills.

        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => setShowRegister(true)}
          >
            Get Started
          </button>

          <button
            className="secondary-btn"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section
        className="stats"
        id="stats"
      >

        <div className="stat">

          <h2>1000+</h2>

          <p>Meals Saved</p>

        </div>

        <div className="stat">

          <h2>50+</h2>

          <p>NGO Partners</p>

        </div>

        <div className="stat">

          <h2>100+</h2>

          <p>Volunteers</p>

        </div>

        <div className="stat">

          <h2>24/7</h2>

          <p>Availability</p>

        </div>

      </section>

            {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="features"
      >

        <h2>
          Why Choose FoodBridge?
        </h2>

        <p className="section-subtitle">
          A simple, transparent and impactful way to
          reduce food waste while helping communities.
        </p>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              📦
            </div>

            <h3>
              Easy Donations
            </h3>

            <p>
              Restaurants, hotels and households can
              donate surplus food in just a few clicks.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🏢
            </div>

            <h3>
              NGO Support
            </h3>

            <p>
              Verified NGOs can browse and claim
              available donations instantly.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🚚
            </div>

            <h3>
              Volunteer Delivery
            </h3>

            <p>
              Volunteers ensure food reaches NGOs
              safely and on time.
            </p>

          </div>

        </div>

      </section>

      {/* ================= PROCESS ================= */}

      <section className="process">

        <h2>
          How It Works
        </h2>

        <div className="process-grid">

          <div className="process-step">

            <span>1</span>

            <h3>
              Donate
            </h3>

            <p>
              Donors upload available food with
              quantity and pickup details.
            </p>

          </div>

          <div className="process-step">

            <span>2</span>

            <h3>
              Claim
            </h3>

            <p>
              NGOs reserve food donations based on
              their requirements.
            </p>

          </div>

          <div className="process-step">

            <span>3</span>

            <h3>
              Deliver
            </h3>

            <p>
              Volunteers collect and deliver the
              donation to the NGO.
            </p>

          </div>

          <div className="process-step">

            <span>4</span>

            <h3>
              Impact
            </h3>

            <p>
              Fresh food reaches people instead of
              ending up in landfills.
            </p>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="cta">

        <h2>
          Every Meal Shared Creates Hope
        </h2>

        <p
        style={{
            color: "#FFFFFF",
            fontSize: "20px",
            lineHeight: "32px",
            opacity: 0.95,
        }}
        >
        Join FoodBridge today and become a part of a movement that's making food accessible,
        reducing waste and helping communities.
        </p>

        <button
          className="primary-btn"
          onClick={() => setShowRegister(true)}
        >
          Join FoodBridge
        </button>

      </section>

      {/* ================= FOOTER ================= */}

      <footer
        className="footer"
        id="footer"
      >

        <div className="brand-circle">
    <img
        src="/foodbridge-logo.png"
        alt="FoodBridge"
        className="brand-logo"
    />

</div>

        <h3>
          FoodBridge
        </h3>

        <p>
          Reducing Food Waste • Feeding Communities •
          Building a Sustainable Future
        </p>

        <div className="footer-links">

          <a href="#features">
            Features
          </a>

          <a href="#stats">
            Impact
          </a>

          <a href="#">
            Privacy
          </a>

        </div>

        <small>
          © 2026 FoodBridge. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default LandingPage;
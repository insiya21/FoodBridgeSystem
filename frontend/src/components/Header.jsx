import "./Header.css";

function Header() {
  const name = localStorage.getItem("name");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="header">
      <div>
        <h1>Welcome back, {name} 👋</h1>
        <p>Here's what's happening today.</p>
      </div>

      <div className="date">
        {today}
      </div>
    </div>
  );
}

export default Header;
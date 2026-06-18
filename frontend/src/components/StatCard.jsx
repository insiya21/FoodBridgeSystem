import "./StatCard.css";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "#6366F1",
}) {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{
          backgroundColor: color,
        }}
      >
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>

        <h2>{value}</h2>

        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
}

export default StatCard;
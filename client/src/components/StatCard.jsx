function StatCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="reference-stat-card">

      <div className="stat-card-top">

        <span className="stat-title">
          {title}
        </span>

        <span className="stat-card-icon">
          {icon}
        </span>

      </div>


      <strong className="stat-value">
        {value}
      </strong>


      <span className="stat-description">
        {description}
      </span>

    </div>
  );
}

export default StatCard;
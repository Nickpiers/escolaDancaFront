import "../styles/card.css";

export const Card = ({ children, className }) => {
  const bgColorClass = className ? "" : "bg-white";
  return (
    <div className={`card-container ${bgColorClass} ${className || ""}`}>
      {children}
    </div>
  );
};

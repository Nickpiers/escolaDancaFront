import "../styles/card.css";

export const Card = ({ children, className, onClick }) => {
  const bgColorClass = className ? "" : "bg-white";

  const handleClick = () => {
    typeof onClick === "function" && onClick();
  };

  return (
    <div
      className={`card-container ${bgColorClass} ${className || ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

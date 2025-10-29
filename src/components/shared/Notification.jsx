import React from "react";

/**
 * Reusable notification component
 * Provides consistent styling across the application
 * 
 * @param {string} message - The notification message to display
 * @param {function} onClose - Callback when close button is clicked
 * @param {string} type - Alert type: 'info', 'success', 'warning', 'danger'
 * @param {boolean} mobile - Whether to adjust for mobile navbar
 */
function Notification({ message, onClose, type = "info", mobile = false }) {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
      style={{
        position: "fixed",
        top: mobile ? "70px" : "20px",
        right: "10px",
        left: "10px",
        zIndex: 1050,
        maxWidth: "500px",
        margin: "0 auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Notification;


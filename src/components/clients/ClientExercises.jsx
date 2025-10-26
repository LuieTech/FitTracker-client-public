import React, { useEffect, useState, useCallback } from "react";
import { deleteExercise, getExercisesByClientId } from "../../services/exercise.service";

function ClientExercises({ clientId }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  const fetchClientExercises = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExercisesByClientId(clientId);
      setExercises(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching client exercises:", err);
      setError("Failed to load exercises");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchClientExercises();
    }
  }, [clientId, fetchClientExercises]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No exercises saved for this client yet.
      </div>
    );
  }

  const handleDelete = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
      setNotification("Exercise deleted successfully!");
    } catch (err) {
      console.error("Error deleting exercise:", err);
      setNotification(`Failed to delete exercise: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="mt-3 mt-md-4">
      {notification && (
        <div 
          className="alert alert-info alert-dismissible fade show" 
          role="alert"
          style={{
            position: 'fixed',
            top: '70px',
            right: '10px',
            left: '10px',
            zIndex: 1050,
            maxWidth: '500px',
            margin: '0 auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {notification}
          <button
            type="button"
            className="btn-close"
            onClick={() => setNotification("")}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
        <h5 className="fw-bold mb-0 fs-6 fs-md-5">
          <i className="bi bi-clipboard-check me-2 text-primary"></i>
          Exercises
        </h5>
        <span className="badge bg-primary rounded-pill">{exercises.length}</span>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-md-3">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="col">
            <div className="card h-100 shadow-sm border">
              {/* Exercise Image */}
              <div className="d-flex justify-content-center p-3 bg-light">
                <img
                  src={exercise.gifUrl}
                  className="card-img-top"
                  alt={exercise.name}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Exercise Details */}
              <div className="card-body p-3">
                <h6 className="card-title fw-bold mb-2" style={{ fontSize: '1rem', lineHeight: '1.3' }}>
                  {exercise.name}
                </h6>
                <div className="mb-2">
                  <span className="badge bg-primary text-uppercase" style={{ fontSize: "0.75rem", padding: '0.4rem 0.6rem' }}>
                    {exercise.bodyPart}
                  </span>
                </div>

                {/* Instructions */}
                {exercise.instructions && exercise.instructions.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted fw-bold d-block mb-1" style={{ fontSize: "0.8rem" }}>
                      Instructions:
                    </small>
                    <ol className="overflow-auto" style={{ fontSize: "0.8rem", paddingLeft: "1.2rem", maxHeight: "120px", lineHeight: '1.4' }}>
                      {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                        <li key={idx} className="text-secondary mb-1">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              {/* Delete Button */}
              <div className="card-footer bg-white border-top p-2">
                <button 
                  className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2" 
                  onClick={() => handleDelete(exercise.id)}
                  style={{ padding: '10px' }}
                >
                  <i className="bi bi-trash"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientExercises;


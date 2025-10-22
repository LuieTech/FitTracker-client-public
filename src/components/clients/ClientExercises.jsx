import React, { useEffect, useState } from "react";
import { deleteExercise, getExercisesByClientId } from "../../services/exercise.service";

function ClientExercises({ clientId }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTimeout, setNotificationTimeout] = useState(null);


  useEffect(() => {
    if (clientId) {
      fetchClientExercises();
    }
  }, [clientId]);

  const fetchClientExercises = async () => {
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
  };

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
      setNotification("Exercise deleted successfully");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      // fetchClientExercises();
    } catch (err) {
      setNotification("Failed to delete exercise: " + err.message);
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

  return (
    <div className="mt-4">
      <h5 className="fw-bold mb-3">Client Exercises ({exercises.length})</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="col">
            <div className="card h-100">
              {/* Exercise Image */}
              <div className="d-flex justify-content-center p-2 bg-light">
                <img
                  src={exercise.gifUrl}
                  className="card-img-top"
                  alt={exercise.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Exercise Details */}
              <div className="card-body">
                <h6 className="card-title fw-bold text-truncate">
                  {exercise.name}
                </h6>
                <div className="mb-2">
                  <span className="badge bg-primary me-1">
                    {exercise.bodyPart}
                  </span>
                </div>

                {/* Instructions */}
                {exercise.instructions && exercise.instructions.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted fw-bold">Instructions:</small>
                    <ol className="mt-1 overflow-auto" style={{ fontSize: "0.85rem", paddingLeft: "1.2rem", flex: "1 1 auto", maxHeight: "200px" }}>
                      {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                        <li key={idx} className="text-secondary">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div className="card-footer bg-transparent border-top-0 d-flex justify-content-end">
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(exercise.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientExercises;


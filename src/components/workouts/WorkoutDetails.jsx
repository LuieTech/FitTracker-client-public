import React from "react";

function WorkoutDetails({ list }) {
  const {gifUrl, name, instructions, bodyPart, difficulty, target } = list;

  return (
    <div>
      <div className="card" style={{ width: "100%" }}>
        <div className="d-flex justify-content-center ">
          <img
            src={gifUrl}
            className="card-img-top"
            alt="Workout-image"
            style={{ width: "60%" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{instructions}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="fw-bold text-primary">Body Part: </span>
            {bodyPart}
          </li>
          <li className="list-group-item">
            <span className="fw-bold text-primary">Difficulty: </span>
            {difficulty}
          </li>
          <li className="list-group-item">
            <span className="fw-bold text-primary">Target: </span>
            {target}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WorkoutDetails;

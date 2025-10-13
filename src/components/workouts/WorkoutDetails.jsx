// 
import React from "react";

function WorkoutDetails({ list }) {
  const { gifUrl, name, description, bodyPart, difficulty, target } = list;

  return (
    <div>
      <div
        className="card"
        style={{
          width: "100%",
          height: "480px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div className="d-flex justify-content-center p-2">
          <img
            src={gifUrl}
            className="card-img-top"
            alt="Workout-image"
            style={{ width: "50%", height: "140px", objectFit: "contain" }}
          />
        </div>

        {/* Scrollable Content Area */}
        <div
          className="card-body overflow-auto"
          style={{ flex: "1 1 auto", maxHeight: "200px" }}
        >
          <h6 className="card-title fw-bold">{name}</h6>
          <p className="card-text" style={{ fontSize: "0.85rem" }}>
            {description}
          </p>
        </div>

        {/* Info List */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className=" text-primary"><i>Body Part: </i></span>
             {bodyPart}
          </li>
          <li className="list-group-item">
            <span className=" text-primary"><i>Difficulty: </i></span>
             {difficulty}
          </li>
          <li className="list-group-item">
            <span className=" text-primary"><i>Target: </i></span>
            {target}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WorkoutDetails;
